import { Link, Navigate, useOutletContext } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/home";

import HomePageListCard from "../components/home/HomePageListCard";
import { Button } from "~/components/shared/Button";

import type { User } from "@supabase/supabase-js";
import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

import { getUserLists } from "~/db/list";

export function meta(_args: Route.MetaArgs) {
    return [
        { title: "BookLover" },
        { name: "description", content: "Bienvenue dans votre gestionnaire de listes de livres!" },
    ];
}

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

    return (
        <div className="m-auto w-4/5 mt-4">
            <h1 className="h1">Mes listes</h1>

            <ul>
                {lists.map((list) => (
                    <li key={list.id}>
                        <HomePageListCard list={list} />
                    </li>
                ))}
            </ul>

            <div className="flex justify-end">
                <Link to="/add-list">
                    <Button className="btn-primary">+</Button>
                </Link>
            </div>
        </div>
    );
}
