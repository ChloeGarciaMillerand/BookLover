import { useEffect } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/landing";

import landingImage from "~/assets/images/booklover_landing_opt.webp";

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
        <div className="mx-auto w-4/5 md:w-3/5 mt-[20vh]">
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
                    <h1 className="text-7xl font-black text-primary mb-4 text-transform: uppercase">Book Lover</h1>
                    <p>L'application qui vous facilite la lecture!</p>
                    <p>Créez vos listes de lecture et</p>
                    <p className="text-primary font-black pale-yellow-background inline-block px-2">
                        retrouvez vos livres favoris
                    </p>
                    <p>où qu vous soyez.</p>
                </div>
                <img src={landingImage} alt="BookLover" className="w-2/3 mt-5 md:w-1/3 md:mt-0" />
            </div>
        </div>
    );
}
