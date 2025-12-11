import { supabase } from "~/db/client";

import type { Route } from "./+types/list";

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
        </div>
    );
}
