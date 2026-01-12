import { redirect, data } from "react-router";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/deleteBook";
import { deleteLinkBookList } from "~/db/booklist";
import { removeBook } from "~/db/book";

export async function action({ params, request }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);

    const { id: listId, bookId } = params;

    if (!bookId || !listId) {
        throw new Response("Missing book id or list id", { status: 400 });
    }

    //delete link between book and list
    try {
        await deleteLinkBookList(supabase, { bookId, listId });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la suppression de la liste" } }, { status: 500 });
    }

    //delete book
    try {
        await removeBook(supabase, { bookId });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la suppression du livre" } }, { status: 500 });
    }

    return redirect(`/list/${listId}`);
}
