import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import heartBook from "~/assets/icons/heart-book.svg";

export default function SignupSuccessPage() {
    const { t } = useTranslation();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta tags */}
            <title>{t("meta.signupSuccess.title")}</title>
            <meta name="description" content={t("meta.signupSuccess.description")} />
            <meta property="og:title" content={t("meta.signupSuccess.title")} />
            <meta property="og:description" content={t("meta.signupSuccess.description")} />

            {/* Content */}
            <img src={heartBook} alt={t("signupSuccess.altHeartBook")} className="mb-3" />
            <h1 className="h1">
                <Trans i18nKey="signupSuccess.title">Welcome to BookLover</Trans>
            </h1>
            <div className="mt-10">
                <p className="mb-3">
                    <Trans i18nKey="signupSuccess.text1">
                        Your account has been created successfully and you will receive a confirmation request by email.
                    </Trans>
                </p>
                <p className="mb-3">
                    <Trans i18nKey="signupSuccess.text2">You will be able to sign in to your account soon.</Trans>
                </p>
                <Link to="/signin" className="btn btn-primary">
                    <Trans i18nKey="signupSuccess.signinButton">Sign in</Trans>
                </Link>
            </div>
        </div>
    );
}
