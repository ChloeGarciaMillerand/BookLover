import { Link, redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import type { Route } from "./+types/signup";
import { getSupabase } from "~/db/client";
import { signup } from "~/db/auth";

import SignupForm from "~/components/auth/SignupForm";
import { createSchema } from "~/components/auth/SignupForm";

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

    // signup
    const { supabase, headers } = getSupabase(params.request);
    try {
        await signup({ supabase, credentials: { email, password } });
    } catch (err: any) {
        if (err?.message?.includes("already registered") || err?.message?.includes("User already registered")) {
            return submission.reply({
                fieldErrors: {
                    email: [t("signup.errorMailMessage")],
                },
            });
        }

        return submission.reply({
            formErrors: [t("signup.errorFormMessage")],
        });
    }

    // Redirect after success
    return redirect("/signup-success", { headers });
}

export default function SignupPage() {
    const { t } = useTranslation();
    return (
        <div className="m-auto w-3/5 md:w-3/10 lg:w-1/5 mt-4">
            {/* Meta tags */}
            <title>{t("meta.signup.title")}</title>
            <meta name="description" content={t("meta.signup.description")} />
            <meta property="og:title" content={t("meta.signup.title")} />
            <meta property="og:description" content={t("meta.signup.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="signup.signupTitle">Sign Up</Trans>
            </h1>
            <SignupForm />

            <div className="divider "></div>

            <div>
                <p className="mb-3">
                    <Trans i18nKey="signup.haveAccount">Already have an account?</Trans>
                </p>
                <Link to="/signin" className="btn btn-primary">
                    <Trans i18nKey="signup.signinButton">Sign In</Trans>
                </Link>
            </div>
        </div>
    );
}
