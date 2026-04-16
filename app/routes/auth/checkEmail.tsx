import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import heartBook from "~/assets/icons/heart-book.svg";

export default function CheckEmailPage() {
    const { t } = useTranslation();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta tags */}
            <title>{t("meta.checkEmail.title")}</title>
            <meta name="description" content={t("meta.checkEmail.description")} />
            <meta property="og:title" content={t("meta.checkEmail.title")} />
            <meta property="og:description" content={t("meta.checkEmail.description")} />

            {/* Content */}
            <img src={heartBook} alt="Livre avec un coeur" className="mb-3" />
            <h1 className="h1 mt-10">
                <Trans i18nKey="checkEmail.title">Check your email</Trans>
            </h1>
            <div className="mt-10">
                <p className="mb-3">
                    <Trans i18nKey="checkEmail.text1">
                        If an account with this email exists, you will receive a password reset link. Please, click on
                        the link in the email to reset your password.
                    </Trans>
                </p>
                <p className="mb-3">
                    <Trans i18nKey="checkEmail.text2">You will then be able to sign in with your new password.</Trans>
                </p>
                <Link to="/signin" className="btn btn-primary mt-3">
                    <Trans i18nKey="checkEmail.button">Sign In</Trans>
                </Link>
            </div>
        </div>
    );
}
