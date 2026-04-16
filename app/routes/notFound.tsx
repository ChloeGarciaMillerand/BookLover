import { Trans } from "react-i18next";
import { data, href, Link } from "react-router";

export async function loader() {
    return data(null, { status: 404 }); // Set the status to 404
}

export default function Component() {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1>
                <Trans i18nKey="404.title">Oops!</Trans>
            </h1>

            <p>
                <Trans i18nKey="404.text">The requested page could not be found.</Trans>
            </p>

            <Link to={href("/")}>
                <Trans i18nKey="404.backHome">Back to Home</Trans>
            </Link>
        </div>
    );
}
