import { useEffect } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/landing";

import landingBooks from "~/assets/images/landing_books.svg";
import landingTablet from "~/assets/images/landing_tablet.webp";
import landingGenres from "~/assets/images/landing_genres.svg";
import landingLine from "~/assets/images/landing_line.svg";
import landingLibrary from "~/assets/images/landing_library.webp";

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
            <div className="flex flex-col-reverse mb-16 md:mb-24 md:flex-row md:justify-between md:items-center gap-4">
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
                <img src={landingBooks} alt="BookLover" className="w-2/3 md:w-2/5" />
            </div>

            {/* Create lists */}
            <div className="pale-yellow-background w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pt-16">
                <div className="mx-auto w-90/100 md:w-85/100 lg:w-75/100 flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-center">
                    <div className="mb-8 md:md-0">
                        <h2 className="h2 text-transform: uppercase">Créez vos propres listes de lecture</h2>
                        <p>
                            <span className="font-black">Ajoutez, modifiez, supprimez des listes </span>pour organiser
                            vos lectures et retrouver facilement vos livres.
                        </p>
                    </div>
                    <img
                        src={landingTablet}
                        alt="Preview of how lists are displayed on a tablet"
                        className="rounded-t-lg shadow-[4px_-4px_10px_rgba(0,0,0,0.15)] md:w-4/5 lg:md-w-3/5"
                    />
                </div>
            </div>

            {/* Add genres */}
            <div className="flex flex-col mt-16 gap-8 md:flex-row md:justify-between md:items-center md:gap-16">
                <div>
                    <h2 className="h2 text-transform: uppercase">Ajoutez des genres personnalisés</h2>
                    <p>
                        <span className="font-black">Ajoutez vos propres genres </span>pour correspondre à vos lectures.
                    </p>
                </div>
                <div className="relative w-full md:w-1/2">
                    <img
                        src={landingGenres}
                        alt="possible genres and icons for science fiction, magic and romance"
                        className="relative z-10 mb-16"
                    />
                    <img src={landingLine} alt="graphic line" className="absolute bottom-0 -right-40 z-0" />
                </div>
            </div>

            {/* Find your books */}
            <div
                className="bg-cover bg-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 opacity-80"
                style={{ backgroundImage: `url(${landingLibrary})` }}
            >
                <div className="mx-auto w-90/100 md:w-85/100 lg:w-75/100 flex justify-end">
                    <div className="bg-white rounded-lg w-full p-8 md:w-1/2 md:p-16">
                        <h2 className="h2 text-transform: uppercase text-right">Gardez vos livres à portée de main</h2>
                        <p className="text-right">
                            Notez les livres qui vous intéressent et consultez vos listes à la bibliothèque, chez un ami
                            ou en librairie pour trouver votre prochaine lecture.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
