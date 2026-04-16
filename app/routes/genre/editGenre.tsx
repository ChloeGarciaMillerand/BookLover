import { data, redirect, useLoaderData } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/editGenre";

import { getOneGenre, updateGenre } from "~/db/genre";
import { commitSession, getSession } from "~/services/sessions.server";

import EditGenreForm from "~/components/genre/editGenreForm";
import { createSchema } from "~/components/genre/editGenreForm";

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
export async function action({ request, params, context }: Route.ActionArgs) {
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
    const i18n = getInstance(context);
    const schema = createSchema(i18n.t);
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return data(submission.reply());
    }

    const t = i18n.t;

    // update genre in database
    try {
        await updateGenre(supabase, { genreId: id, name: submission.value.name, color: submission.value.color });

        //success message
        session.flash("success", t("editGenre.successMessage"));

        // Redirect after success
        return redirect(`/genres`, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch {
        return data({ errors: { form: t("editGenre.errorMessage") } }, { status: 500 });
    }
}

export default function editGenre() {
    const { t } = useTranslation();
    const { genre } = useLoaderData();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>{t("meta.editGenre.title")}</title>
            <meta name="description" content={t("meta.editGenre.description")} />
            <meta property="og:title" content={t("meta.editGenre.title")} />
            <meta property="og:description" content={t("meta.editGenre.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="editGenre.title" values={{ name: genre.name }}>
                    Update the "{genre.name}" genre
                </Trans>
            </h1>
            <EditGenreForm genre={genre} />
        </div>
    );
}
