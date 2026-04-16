import { redirect, data } from "react-router";
import { getInstance } from "~/middlewares/i18next";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/deleteBook";

import { deleteLinkBookList } from "~/db/booklist";
import { removeBook } from "~/db/book";
import { commitSession, getSession } from "~/services/sessions.server";

import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ params, request, context }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const session = await getSession(request.headers.get("Cookie"));

    const { id: listId, bookId } = params;

    if (!bookId) {
        session.flash("error", "Identifiant manquant");
        return redirect(`/list/${listId}`, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    //translation
    const i18n = getInstance(context);
    const t = i18n.t;

    try {
        //delete link between book and list
        await deleteLinkBookList(supabase, { bookId, listId });
        //delete book
        await removeBook(supabase, { bookId });
        //success message
        session.flash("success", t("deleteBook.successMessage"));
    } catch (error) {
        console.error(error);
        return data({ errors: { form: t("deleteBook.errorMessage") } }, { status: 500 });
    }

    return redirect(`/list/${listId}`, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}
