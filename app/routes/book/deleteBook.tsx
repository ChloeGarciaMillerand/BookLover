import { redirect, data } from "react-router";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/deleteBook";
import { deleteLinkBookList } from "~/db/booklist";
import { removeBook } from "~/db/book";
import { authMiddleware } from "~/middlewares/authMiddleware";
import { commitSession, getSession } from "~/services/sessions.server";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ params, request }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const session = await getSession(request.headers.get("Cookie"));

    const { id: listId, bookId } = params;

    if (!bookId || !listId) {
        /*
        throw new Response("Missing book id or list id", { status: 400 });
        */
        session.flash("error", "Identifiant manquant");
        return redirect(`/`, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    try {
        //delete link between book and list
        await deleteLinkBookList(supabase, { bookId, listId });
        //delete book
        await removeBook(supabase, { bookId });
        //success message
        session.flash("success", "Livre supprimé avec succès!");
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la suppression de la liste" } }, { status: 500 });
    }

    return redirect(`/list/${listId}`, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}
