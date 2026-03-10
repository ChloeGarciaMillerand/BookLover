import { redirect, data } from "react-router";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/deleteGenre";

import { deleteGenre } from "~/db/genre";
import { commitSession, getSession } from "~/services/sessions.server";

import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ params, request }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const session = await getSession(request.headers.get("Cookie"));

    const { id } = params;

    if (!id) {
        session.flash("error", "Identifiant manquant");
        return redirect(`/genres`, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    try {
        //delete genre
        await deleteGenre(supabase, { genreId: id });
        //success message
        session.flash("success", "Genre supprimé avec succès!");
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la suppression du genre" } }, { status: 500 });
    }

    return redirect(`/genres`, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}
