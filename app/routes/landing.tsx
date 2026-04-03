import { useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { Trans } from "react-i18next";

import type { Route } from "./+types/landing";

import landingBooks from "~/assets/images/landing_books.svg";
import landingTablet from "~/assets/images/landing_tablet.webp";
import landingGenres from "~/assets/images/landing_genres.svg";
import landingLine from "~/assets/images/landing_line.svg";
import landingLibrary from "~/assets/images/landing_library.webp";

import { getInstance } from "~/middlewares/i18next";

export async function loader({ context }: Route.LoaderArgs) {
    let i18next = getInstance(context);
    return { title: i18next.t("meta.landing.title"), description: i18next.t("meta.landing.description") };
}

export default function landing() {
    const { title, description } = useLoaderData();
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
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            {/* Content */}
            {/* Home */}
            <div className="flex flex-col-reverse mb-16 md:mb-24 md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-5xl font-black mt-4 mb-4 text-transform: uppercase md:mt-0 lg:text-6xl">
                        Book Lover
                    </h1>
                    <p>
                        <Trans i18nKey="landing.homeText1">The application that makes reading easier for you!</Trans>
                    </p>
                    <p>
                        <Trans i18nKey="landing.homeText2">Create your reading lists and</Trans>
                    </p>
                    <p className="text-primary font-black pale-yellow-background inline-block px-2">
                        <Trans i18nKey="landing.homeText3">find your favorite books</Trans>
                    </p>
                    <p>
                        <Trans i18nKey="landing.homeText4">wherever you are.</Trans>
                    </p>
                    <div className="flex flex-row gap-4 md:hidden">
                        <Link to="/signin" className="btn btn-outline btn-secondary mt-5">
                            <Trans i18nKey="buttons.signinButton">Sign In</Trans>
                        </Link>
                        <Link to="/signup" className="btn btn-primary mt-5">
                            <Trans i18nKey="buttons.signupButton">Sign Up</Trans>
                        </Link>
                    </div>
                </div>
                <img src={landingBooks} alt="BookLover" className="w-2/3 md:w-2/5" />
            </div>

            {/* Create lists */}
            <div className="pale-yellow-background w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pt-16">
                <div className="mx-auto w-90/100 md:w-85/100 lg:w-75/100 flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-center">
                    <div className="mb-8 md:md-0">
                        <h2 className="h2 text-transform: uppercase">
                            <Trans i18nKey="landing.listsTitle">Create your reading lists</Trans>
                        </h2>
                        <p>
                            <span className="font-black">
                                <Trans i18nKey="landing.listsTextSpan">Add, update, delete your lists</Trans>
                            </span>
                            <Trans i18nKey="landing.listsText">to organize and find your books more easily.</Trans>
                        </p>
                    </div>
                    <img
                        src={landingTablet}
                        alt="Preview of how lists are displayed on a tablet"
                        className="rounded-t-lg shadow-[4px_-4px_10px_rgba(0,0,0,0.15)] md:w-4/5 lg:w-3/5"
                    />
                </div>
            </div>

            {/* Add genres */}
            <div className="flex flex-col mt-16 gap-8 md:flex-row md:justify-between md:items-center md:gap-16">
                <div>
                    <h2 className="h2 text-transform: uppercase">
                        <Trans i18nKey="landing.genresTitle">Add personalized genres</Trans>
                    </h2>
                    <p>
                        <span className="font-black">
                            <Trans i18nKey="landing.genresTextSpan">Create your own genres</Trans>
                        </span>
                        <Trans i18nKey="landing.genresText">to categorize your books in a way that suits you.</Trans>
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

            {/* Keep your books */}
            <div
                className="bg-cover bg-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 opacity-80"
                style={{ backgroundImage: `url(${landingLibrary})` }}
            >
                <div className="mx-auto w-90/100 md:w-85/100 lg:w-75/100 flex justify-end">
                    <div className="bg-white rounded-lg w-full p-8 md:w-1/2 md:p-16">
                        <h2 className="h2 text-transform: uppercase text-right">
                            <Trans i18nKey="landing.keepYourBooksTitle">Keep your books with you</Trans>
                        </h2>
                        <p className="text-right">
                            <Trans i18nKey="landing.keepYourBooksText">
                                Save books you’re interested in and access your lists at the library, at a friend’s
                                place, or in a bookstore to discover your next read.
                            </Trans>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
