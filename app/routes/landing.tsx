import { useEffect } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/landing";

import landingBooks from "~/assets/images/landing_books.svg";
import landingTablet from "~/assets/images/landing_tablet.webp";
import landingGenres from "~/assets/images/landing_genres.svg";
import landingLine from "~/assets/images/landing_line.svg";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "BookLover, organisez vos lectures facilement!" }];
}

export default function landing() {
    // set theme to light on landing page
    useEffect(() => {
        const root = document.documentElement;

        // force light
        root.setAttribute("data-theme", "light");

        return () => {
            // IMPORTANT : remove dark theme on unmount to allow dark mode in other pages
            root.removeAttribute("data-theme");
        };
    }, []);
    return (
        <div className="mx-auto w-90/100 md:w-85/100 lg:w-75/100">
            {/* Meta*/}
            <title>BookLover - Accueil</title>
            <meta
                name="description"
                content="Découvrez BookLover, l'application de gestions de listes de lecture et inscrivez-vous!"
            />
            <meta property="og:title" content="BookLover - Accueil" />
            <meta property="og:description" content="L'application qui facilite vos lectures." />

            {/* Content */}
            {/* Home */}
            <div className="flex flex-col-reverse mb-8 md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-5xl font-black mt-4 mb-4 text-transform: uppercase md:mt-0 lg:text-6xl">
                        Book Lover
                    </h1>
                    <p>L'application qui vous facilite la lecture!</p>
                    <p>Créez vos listes de lecture et</p>
                    <p className="text-primary font-black pale-yellow-background inline-block px-2">
                        retrouvez vos livres favoris
                    </p>
                    <p>où qu vous soyez.</p>
                    <div className="flex flex-row gap-4 md:hidden">
                        <Link to="/signin" className="btn btn-outline btn-secondary mt-5">
                            Se connecter
                        </Link>
                        <Link to="/signup" className="btn btn-primary mt-5">
                            Créer un compte
                        </Link>
                    </div>
                </div>
                <img src={landingBooks} alt="BookLover" className="w-2/3 md:w-1/2" />
            </div>

            {/* Create lists */}
            <div className="pale-yellow-background w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pt-8">
                <div className="mx-auto w-90/100 md:w-85/100 lg:w-75/100 flex flex-col md:flex-row-reverse gap-8 items-center">
                    <div className="mb-8 md:md-0">
                        <h2 className="h2 text-transform: uppercase">Créez vos propres listes de lecture</h2>
                        <p>
                            <span>Ajoutez, modifiez, supprimez des listes </span>pour organiser vos lectures et
                            retrouver facilement vos livres.
                        </p>
                    </div>
                    <img
                        src={landingTablet}
                        alt="Preview of how lists are displayed on a tablet"
                        className="rounded-t-lg shadow-[4px_-4px_10px_rgba(0,0,0,0.15)] md:w-full"
                    />
                </div>
            </div>

            {/* Add genres */}
            <div className="flex flex-col mt-8 md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h2 className="h2 text-transform: uppercase">Ajoutez des genres personnalisés</h2>
                    <p>
                        <span>Ajoutez vos propres genres </span>pour correspondre à vos lectures.
                    </p>
                </div>
                <div className="relative w-full md:w1/2">
                    <img
                        src={landingGenres}
                        alt="possible genres and icons for science fiction, magic and romance"
                        className="relative z-10 mb-8"
                    />
                    <img src={landingLine} alt="graphic line" className="absolute bottom-0 -right-20 z-0" />
                </div>
            </div>
        </div>
    );
}
