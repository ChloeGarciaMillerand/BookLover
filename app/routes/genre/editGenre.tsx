import { data, redirect, useLoaderData } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/editGenre";

import { getOneGenre, updateGenre } from "~/db/genre";
import { commitSession, getSession } from "~/services/sessions.server";

import EditGenreForm from "~/components/genre/editGenreForm";
import { schema } from "~/components/genre/editGenreForm";

import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ params, request }: Route.LoaderArgs) {
    const { supabase } = getSupabase(request);

    const { id } = params;

    if (!id) {
        throw new Response("Missing genre id", { status: 400 });
    }

    // load genre data
    const genre = await getOneGenre(supabase, id);

    return { genre };
}

//update genre
export async function action({ request, params }: Route.ActionArgs) {
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

    const formData = await request.formData();

    // Parse object
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return data(submission.reply());
    }

    // update genre in database
    try {
        await updateGenre(supabase, { genreId: id, name: submission.value.name, color: submission.value.color });

        //success message
        session.flash("success", "Genre mis à jour avec succès");

        // Redirect after success
        return redirect(`/genres`, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch {
        return data({ errors: { form: "Erreur lors de la modification du genre" } }, { status: 500 });
    }
}

export default function editGenre() {
    const { genre } = useLoaderData();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>BookLover - Modifier un genre</title>
            <meta name="description" content="Modifier un genre pour organiser vos listes de lectures BookLover" />
            <meta property="og:title" content="BookLover - Modifier un genre" />
            <meta property="og:description" content="L'application qui facilite vos lectures" />

            {/* Content */}
            <h1 className="h1">Modifier le genre {genre.name}</h1>
            <EditGenreForm genre={genre} />
        </div>
    );
}
