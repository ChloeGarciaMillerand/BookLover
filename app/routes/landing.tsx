import { Link } from "react-router";

import type { Route } from "./+types/landing";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "BookLover, organisez vos lectures facilement!" }];
}

export default function landing() {
    return (
        <div className="mx-auto w-4/5 md:w-2/5 mt-[20vh]">
            {/* Meta*/}
            <title>BookLover - Accueil</title>
            <meta
                name="description"
                content="Découvrez BookLover, l'application de gestions de listes de lecture et inscrivez-vous!"
            />
            <meta property="og:title" content="BookLover - Accueil" />
            <meta property="og:description" content="L'application qui facilite vos lectures." />

            {/* Content */}
            <h1 className="h1">BookLover</h1>
            <p>L'application qui vous facilite la lecture!</p>
            <Link to="/signin" className="btn btn-primary">
                Se connecter / s'inscrire
            </Link>
        </div>
    );
}
