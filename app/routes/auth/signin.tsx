import { data, Link, redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/signin";
import { signin } from "~/db/auth";

import SigninForm from "~/components/auth/SigninForm";
import { createSchema } from "~/components/auth/SigninForm";

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
    const password = String(formData.get("password"));

    const t = i18n.t;

    //signin
    const { supabase, headers } = getSupabase(params.request);
    try {
        await signin({ supabase, credentials: { email, password } });
    } catch {
        return submission.reply({
            formErrors: [t("signin.errorMessage")],
        });
    }

    // Redirect after success
    return redirect("/", { headers });
}

export default function SigninPage() {
    const { t } = useTranslation();
    return (
        <div className="m-auto w-3/5 md:w-3/10 lg:w-1/5 mt-4">
            {/* Meta tags */}
            <title>{t("meta.signin.title")}</title>
            <meta name="description" content={t("meta.signin.description")} />
            <meta property="og:title" content={t("meta.signin.title")} />
            <meta property="og:description" content={t("meta.signin.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="signin.signinTitle">Sign In</Trans>
            </h1>
            <SigninForm />
            <Link to="/forgot-password" className="link link-primary">
                <Trans i18nKey="signin.forgotPassword">Forgot password?</Trans>
            </Link>

            <div className="divider "></div>

            <div>
                <p className="mb-3">
                    <Trans i18nKey="signin.notAccount">Don't have an account?</Trans>
                </p>
                <Link to="/signup" className="btn btn-primary">
                    <Trans i18nKey="signin.signupButton">Create an account</Trans>
                </Link>
            </div>
        </div>
    );
}
