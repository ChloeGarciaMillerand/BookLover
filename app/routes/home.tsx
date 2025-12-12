import { Link } from "react-router";

import { supabase } from "~/db/client";
import type { Route } from "./+types/home";

import HomePageListCard from "../components/HomePageListCard";
import { Button } from "~/components/Button";
import type { HomePageList } from "~/types";

export function meta(_args: Route.MetaArgs) {
    return [
        { title: "BookLover" },
        { name: "description", content: "Bienvenue dans votre gestionnaire de listes de livres!" },
    ];
}

export async function loader(_props: Route.LoaderArgs) {
    const { data, error } = await supabase.from("list").select(`
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
        `);

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
}

export default function HomePage(props: Route.ComponentProps) {
    const { lists } = props.loaderData;
    return (
        <div className="m-auto w-4/5 mt-4">
            <h1 className="h1">Mes listes</h1>

            <ul>
                {lists.map((list) => (
                    <li key={list.id}>
                        <Link to={`list/${list.id}`} className="block">
                            <HomePageListCard list={list} />
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end">
                <Link to="/addList">
                    <Button className="btn-primary">+</Button>
                </Link>
            </div>
        </div>
    );
}
