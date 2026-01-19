import { redirect, data } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/deleteList";
import { removeList } from "~/db/list";
import { getBooksIdsInList, removeBooksLinksInList } from "~/db/booklist";
import { removeBooksInList } from "~/db/book";
import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ params, request }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);

    const listId = params.id;
    if (!listId) {
        return data({ errors: { form: "Identifiant de liste invalide" } }, { status: 400 });
    }

    try {
        // get books id
        const bookIds = await getBooksIdsInList(supabase, { listId });
        // delete links between books and list
        await removeBooksLinksInList(supabase, { listId });
        // delete books in list
        await removeBooksInList(supabase, { bookIds });
        // delete list
        await removeList(supabase, { listId });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la suppression de la liste" } }, { status: 500 });
    }

    return redirect("/");
}
