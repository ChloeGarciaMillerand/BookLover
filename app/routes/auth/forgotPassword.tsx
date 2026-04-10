import { redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/updatePassword";

import { resetPasswordRequest } from "~/db/auth";
import EmailForResetPasswordForm from "~/components/auth/EmailForResetPasswordForm";
import { createSchema } from "~/components/auth/EmailForResetPasswordForm";

export async function action(params: Route.ActionArgs) {
    const formData = await params.request.formData();

    // Parse object
    const i18n = getInstance(params.context);
    const schema = createSchema(i18n.t);
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    const email = String(formData.get("email"));

    const t = i18n.t;

    //reset password request
    const { supabase, headers } = getSupabase(params.request);
    try {
        await resetPasswordRequest({ supabase, email });
    } catch {
        return submission.reply({
            formErrors: [t("forgotPassword.errorMessage")],
        });
    }

    return redirect("/check-email", { headers });
}

export default function ForgotPasswordPage() {
    const { t } = useTranslation();
    return (
        <div className="m-auto w-3/5 md:w-3/10 lg:w-1/5 mt-4">
            {/* Meta tags */}
            <title>{t("meta.forgotPassword.title")}</title>
            <meta name="description" content={t("meta.forgotPassword.description")} />
            <meta property="og:title" content={t("meta.forgotPassword.title")} />
            <meta property="og:description" content={t("meta.forgotPassword.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="forgotPassword.forgotPasswordTitle">Forgot Password</Trans>
            </h1>
            <p>
                <Trans i18nKey="forgotPassword.forgotPasswordText">
                    Enter your email address and we'll send you a link to reset your password.
                </Trans>
            </p>
            <EmailForResetPasswordForm />
        </div>
    );
}
