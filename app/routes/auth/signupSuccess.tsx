import { Link } from "react-router";

import type { Route } from "./+types/signupSuccess";

import heartBook from "~/assets/icons/heart-book.svg";

export function meta(_args: Route.MetaArgs) {
    return [
        { title: "Inscription réussie - BookLover" },
        { name: "description", content: "Votre compte a été créé avec succès! Connectez-vous pour gérer vos livres." },
    ];
}

export default function SignupSuccessPage() {
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <img src={heartBook} alt="Livre avec un coeur" className="mb-3" />
            <h1 className="h1">Bienvenue dans BookLover!</h1>
            <div className="mt-10">
                <p className="mb-3">
                    Votre compte a été créé avec succès et vous allez recevoir une demande de confirmation par email.
                </p>
                <p className="mb-3">Vous pourrez ensuite vous connecter à votre compte. </p>
                <Link to="/signin" className="btn btn-primary">
                    Se connecter
                </Link>
            </div>
        </div>
    );
}
