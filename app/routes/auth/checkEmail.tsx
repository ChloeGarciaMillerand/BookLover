import { Link } from "react-router";

import type { Route } from "./+types/signupSuccess";

import heartBook from "~/assets/icons/heart-book.svg";

export function meta(_args: Route.MetaArgs) {
    return [
        { title: "Mot de passe oublié - BookLover" },
        { name: "description", content: "Un email de confirmation vous a été envoyé." },
    ];
}

export default function CheckEmailPage() {
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <img src={heartBook} alt="Livre avec un coeur" className="mb-3" />
            <h1 className="h1">Mot de passe oublié</h1>
            <div className="mt-10">
                <p className="mb-3">
                    Un email de réinitialisation vous a été envoyé. Veuillez cliquer sur le lien pour réinitialiser
                    votre mot de passe.
                </p>
                <p className="mb-3">Vous pourrez ensuite vous connecter à votre compte. </p>
                <Link to="/signin" className="btn btn-primary">
                    Se connecter
                </Link>
            </div>
        </div>
    );
}
