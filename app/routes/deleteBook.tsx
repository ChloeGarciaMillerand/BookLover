import { redirect } from "react-router";

import { supabase } from "~/db/client";

import type { Route } from "./+types/deleteBook";

export async function action({ params }: Route.ActionArgs) {
    const { id: listId, bookId } = params;

    if (!bookId || !listId) {
        throw new Response("Missing book id or list id", { status: 400 });
    }

    //delete link between book and list
    const { error: linkError } = await supabase.from("booklist").delete().eq("book_id", bookId).eq("list_id", listId);

    if (linkError) {
        return new Response(
            JSON.stringify({ errors: { form: "Erreur lors de la suppression du lien livre / liste" } }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    //delete book
    const { error: bookError } = await supabase.from("book").delete().eq("id", bookId);

    if (bookError) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la suppression du livre" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return redirect(`/list/${listId}`);
}
