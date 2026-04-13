import { data, redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/updatePassword";

import { updatePassword } from "~/db/auth";
import ResetPasswordForm from "~/components/auth/ResetPasswordForm";
import { createSchema } from "~/components/auth/ResetPasswordForm";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Réinitialisez votre mot de passe" }];
}

export async function loader({ request }: Route.LoaderArgs) {
    const { supabase, headers } = getSupabase(request);

    //start a new session to get the access token from the url
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            throw redirect("/signin");
        }
    }

    return data({}, { headers });
}

export async function action({ request, context }: Route.ActionArgs) {
    const { supabase, headers } = getSupabase(request);

    const formData = await request.formData();

    console.log("ACTION CALLED");

    // Parse object
    const i18n = getInstance(context);
    const schema = createSchema(i18n.t);
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    console.log("VALIDATION OK");

    const password = String(formData.get("password"));

    const t = i18n.t;

    //update password

    try {
        await updatePassword({ supabase, password });
        const {
            data: { user },
        } = await supabase.auth.getUser();

        console.log("USER:", user);
    } catch (errror: any) {
        console.error("Error updating password:", errror);
        return submission.reply({
            formErrors: [t("resetPassword.errorMessage")],
        });
    }

    // Redirect after success
    return redirect("/signin", { headers });
}

export default function UpdatePasswordPage() {
    const { t } = useTranslation();
    return (
        <div className="m-auto w-3/5 md:w-3/10 lg:w-1/5 mt-4">
            {/* Meta tags */}
            <title>{t("meta.resetPassword.title")}</title>
            <meta name="description" content={t("meta.resetPassword.description")} />
            <meta property="og:title" content={t("meta.resetPassword.title")} />
            <meta property="og:description" content={t("meta.resetPassword.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="resetPassword.title">Reset Password</Trans>
            </h1>
            <ResetPasswordForm />
        </div>
    );
}
