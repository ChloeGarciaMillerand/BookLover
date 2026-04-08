import { Navigate, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import type { User } from "@supabase/supabase-js";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/genres";

import { getAllGenres } from "~/db/genre";

import GenreCard from "~/components/genre/GenreCard";
import { Button } from "~/components/shared/Button";
import { AddGenreModal } from "~/routes/genre/addGenre";

import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

type ContextType = {
    user: User | null;
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader(params: Route.LoaderArgs) {
    const user = getCurrentUser(params.context);
    const { supabase } = getSupabase(params.request);

    const genres = await getAllGenres(supabase, { userId: user.id });

    return { genres };
}

export default function GenresPage(props: Route.ComponentProps) {
    const { user } = useOutletContext<ContextType>();
    const { genres } = props.loaderData;

    const { t } = useTranslation();

    //redirect if no user logged in
    if (!user) {
        return <Navigate to="/landing" replace />;
    }

    const [isScrollable, setIsScrollable] = useState(false);

    //check if window is scrollable
    useEffect(() => {
        const checkScrollable = () => {
            setIsScrollable(document.body.scrollHeight > window.innerHeight);
        };

        checkScrollable();
        window.addEventListener("resize", checkScrollable);

        return () => window.removeEventListener("resize", checkScrollable);
    }, [genres]);

    // used to create new genres
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="m-auto w-4/5 mt-4 mb-5 md:w-3/5">
                {/* Meta*/}
                <title>{t("meta.genres.title")}</title>
                <meta name="description" content={t("meta.genres.description")} />
                <meta property="og:title" content={t("meta.genres.title")} />
                <meta property="og:description" content={t("meta.genres.description")} />

                {/* Content */}
                <h1 className="h1">Genres</h1>

                <ul className={`${isScrollable ? "mb-25" : ""}`}>
                    {genres.map((genre) => (
                        <li key={genre.id}>
                            <GenreCard genre={genre} />
                        </li>
                    ))}
                </ul>

                <div
                    className={`${isScrollable ? "fixed bottom-20 z-50" : "mt-4 flex justify-end"}`}
                    style={isScrollable ? { left: "65%" } : {}}
                >
                    <Button className="btn-primary" onClick={() => setShowModal(true)}>
                        <Trans i18nKey="genre.addGenreButton">Add a genre</Trans>
                    </Button>
                </div>
            </div>
            {showModal && <AddGenreModal onClose={() => setShowModal(false)} />}
        </>
    );
}
