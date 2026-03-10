import { Link, Navigate, useOutletContext } from "react-router";
import { useEffect, useState } from "react";

import type { User } from "@supabase/supabase-js";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/genres";

import { getAllGenres } from "~/db/genre";

import GenreCard from "~/components/genre/GenreCard";
import { Button } from "~/components/shared/Button";

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

    return (
        <div className="m-auto w-4/5 mt-4 mb-5 md:w-3/5">
            {/* Meta*/}
            <title>BookLover - Genres</title>
            <meta name="description" content="Visualiser les genres de vos livres !" />
            <meta property="og:title" content="BookLover - Genres" />
            <meta property="og:description" content="L'application qui facilite vos lectures." />

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
                <Link to="/add-genre">
                    <Button className="btn-primary">Créer un genre</Button>
                </Link>
            </div>
        </div>
    );
}
