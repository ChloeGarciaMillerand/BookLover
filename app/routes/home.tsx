import { Link, Navigate, useOutletContext } from "react-router";
import { useEffect, useState } from "react";

import type { User } from "@supabase/supabase-js";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/home";

import { getUserLists } from "~/db/list";

import HomePageListCard from "../components/home/HomePageListCard";
import { Button } from "~/components/shared/Button";

import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

type ContextType = {
    user: User | null;
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader(params: Route.LoaderArgs) {
    const user = getCurrentUser(params.context);
    const { supabase } = getSupabase(params.request);

    const lists = await getUserLists(supabase, { userId: user.id });

    return { lists };
}

export default function HomePage(props: Route.ComponentProps) {
    const { user } = useOutletContext<ContextType>();
    const { lists } = props.loaderData;

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
    }, [lists]);

    //message if no list exists
    let emptyMessage = null;

    if (lists.length === 0) {
        emptyMessage = (
            <p>
                Il n'y a pas encore de listes. <br />
                Commencer par en créer une.
            </p>
        );
    }

    return (
        <div className="m-auto w-4/5 mt-4 mb-5 md:w-3/5">
            {/* Meta*/}
            <title>BookLover - Accueil</title>
            <meta name="description" content="Bienvenue dans votre gestionnaire de livres!" />
            <meta property="og:title" content="BookLover - Accueil" />
            <meta property="og:description" content="L'application qui facilite vos lectures." />

            {/* Content */}
            <h1 className="h1">Mes listes</h1>

            <div className="my-5">{emptyMessage}</div>

            <ul className={`${isScrollable ? "mb-25" : ""}`}>
                {lists.map((list) => (
                    <li key={list.id}>
                        <HomePageListCard list={list} />
                    </li>
                ))}
            </ul>

            <div
                className={`${isScrollable ? "fixed bottom-20 z-50" : "mt-4 flex justify-end"}`}
                style={isScrollable ? { left: "65%" } : {}}
            >
                <Link to="/add-list">
                    <Button className="btn-primary">Créer une liste</Button>
                </Link>
            </div>
        </div>
    );
}
