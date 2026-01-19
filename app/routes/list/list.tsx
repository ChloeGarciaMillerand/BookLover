import { Link } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/list";

import BookCard from "~/components/book/BookCard";
import { Button } from "~/components/shared/Button";
import { getOneListWithGenres } from "~/db/list";
import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ params, request }: Route.LoaderArgs) {
    const { supabase } = getSupabase(request);

    const listId = params.id;

    if (!listId) {
        throw new Response("Missing list id", { status: 400 });
    }

    const list = await getOneListWithGenres(supabase, { listId });

    return list;
}

export default function ListPage(props: Route.ComponentProps) {
    const { list } = props.loaderData;

    return (
        <div className="m-auto w-4/5 mt-4">
            {/* Meta*/}
            <title>BookLover - Détail d'une liste</title>
            <meta name="description" content="Visualiser une liste de lecture BookLover" />
            <meta property="og:title" content="BookLover - Détail d'une liste" />
            <meta property="og:description" content="L'application qui facilite vos lectures." />

            {/* Content */}
            <h1 className="h1">{list.name}</h1>

            <ul>
                {list.booklist.map(({ book }) =>
                    book ? (
                        <li key={book.id}>
                            <BookCard book={book} list={list} />
                        </li>
                    ) : null,
                )}
            </ul>

            <div className="flex justify-end">
                <Link to={`/list/${list.id}/add-book`}>
                    <Button className="btn-primary">Ajouter un livre</Button>
                </Link>
            </div>
        </div>
    );
}
