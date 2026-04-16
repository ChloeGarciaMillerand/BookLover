import { redirect, data } from "react-router";
import { getInstance } from "~/middlewares/i18next";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/deleteList";

import { removeList } from "~/db/list";
import { getBooksIdsInList, removeBooksLinksInList } from "~/db/booklist";
import { removeBooksInList } from "~/db/book";
import { commitSession, getSession } from "~/services/sessions.server";

import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ params, request, context }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const session = await getSession(request.headers.get("Cookie"));

    const listId = params.id;
    if (!listId) {
        session.flash("error", "Identifiant manquant");
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    //translation
    const i18n = getInstance(context);
    const t = i18n.t;

    try {
        // get books id
        const bookIds = await getBooksIdsInList(supabase, { listId });
        // delete links between books and list
        await removeBooksLinksInList(supabase, { listId });
        // delete books in list
        await removeBooksInList(supabase, { bookIds });
        // delete list
        await removeList(supabase, { listId });
        //success message
        session.flash("success", t("deleteList.successMessage"));
    } catch (error) {
        console.error(error);
        return data({ errors: { form: t("deleteList.errorMessage") } }, { status: 500 });
    }

    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });

    /*
    return data(
        { success: "Liste supprimée avec succès!" },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
    */
}
