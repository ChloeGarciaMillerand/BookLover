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

    /*
    // get lists
    const { data, error } = await supabase
        .from("list")
        .select(`
            id,
            name,
            organization (
                id,
                name
            ),
            booklist (
                book (
                    id,
                    title,
                    author,
                    genre (
                        id,
                        name,
                        color
                    )
                )
            )
        `)
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    const supabaseLists = data;

    const lists: HomePageList[] = supabaseLists.map((list) => ({
        id: list.id,
        name: list.name,
        organization: list.organization ?? undefined,
        books: list.booklist
            .filter((entry) => entry.book !== null)
            .map((entry) => ({
                id: entry.book!.id,
                title: entry.book!.title,
                author: entry.book!.author ?? undefined,
                genre: entry.book!.genre
                    ? {
                          id: entry.book!.genre.id,
                          name: entry.book!.genre.name,
                          color: entry.book!.genre.color,
                      }
                    : undefined,
            })),
    }));

    return { lists };
    */
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
