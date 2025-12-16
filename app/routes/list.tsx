import { Link } from "react-router";

import { supabase } from "~/db/client";
import type { Route } from "./+types/list";

import BookCard from "~/components/BookCard";
import { Button } from "~/components/Button";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Voir le détail de ma liste de livres" }];
}

export async function loader(args: Route.LoaderArgs) {
    const listId = args.params.id;

    if (!listId) {
        throw new Response("Missing list id", { status: 400 });
    }

    const { data, error } = await supabase
        .from("list")
        .select(`
                *,
                booklist (
                    book (
                        *,
                        genre(*)
                    )
                )
            `)
        .eq("id", listId)
        .single();

    if (error) {
        throw new Response(error.message, { status: 500 });
    }

    return { list: data };
}

export default function ListPage(props: Route.ComponentProps) {
    const { list } = props.loaderData;

    return (
        <div className="m-auto w-4/5 mt-4">
            <h1 className="h1">{list.name}</h1>

            <ul>
                {list.booklist.map(({ book }) =>
                    book ? (
                        <li key={book.id}>
                            <BookCard book={book} />
                        </li>
                    ) : null,
                )}
            </ul>

            <div className="flex justify-end">
                <Link to={`/list/${list.id}/add-book`}>
                    <Button className="btn-primary">+</Button>
                </Link>
            </div>
        </div>
    );
}
