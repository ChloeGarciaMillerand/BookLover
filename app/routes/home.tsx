import { Link } from "react-router";

import { supabase } from "~/db/client";
import type { Route } from "./+types/home";

import HomePageListCard from "../components/HomePageListCard";
import { Button } from "~/components/Button";

export function meta(_args: Route.MetaArgs) {
    return [
        { title: "BookLover" },
        { name: "description", content: "Bienvenue dans votre gestionnaire de listes de livres!" },
    ];
}

export async function loader(_props: Route.LoaderArgs) {
    const { data, error } = await supabase.from("list").select();

    if (error) {
        throw new Error(error.message);
    }

    return { lists: data };
}

export default function HomePage(props: Route.ComponentProps) {
    const { lists } = props.loaderData;
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
                <Link to="/addList">
                    <Button className="btn-primary">+</Button>
                </Link>
            </div>
        </div>
    );
}
