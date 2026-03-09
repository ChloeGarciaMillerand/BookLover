import { Link } from "react-router";

import type { Route } from "./+types/landing";

import landingImage from "~/assets/images/booklover_landing_opt.webp";

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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="h1">BookLover</h1>
                    <p>L'application qui vous facilite la lecture!</p>

                    <div className="flex flex-row gap-4">
                        <Link to="/signin" className="btn btn-primary mt-5">
                            Se connecter
                        </Link>
                        <Link to="/signup" className="btn btn-outline btn-primary mt-5">
                            S'inscrire
                        </Link>
                    </div>
                </div>
                <img src={landingImage} alt="BookLover" className="w-2/3 mt-5 md:w-1/3 md:mt-0" />
            </div>
        </div>
    );
}
