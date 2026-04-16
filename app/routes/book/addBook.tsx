import { data, redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/addBook";

import { getAllGenres } from "~/db/genre";
import { commitSession, getSession } from "~/services/sessions.server";

import AddBookForm from "~/components/book/addBookForm";
import { createSchema } from "~/components/book/addBookForm";

import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

// load genres
export async function loader(params: Route.LoaderArgs) {
    const user = getCurrentUser(params.context);
    const { supabase } = getSupabase(params.request);

    if (!user) {
        throw new Response("Unauthorized", { status: 401 });
    }

    const genres = await getAllGenres(supabase, { userId: user.id });

    return { genres };
}

// add new book in database
export async function action({ params, request, context }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const session = await getSession(request.headers.get("Cookie"));

    const listId = params.id;
    if (!listId) {
        session.flash("error", "Liste invalide");
        return redirect(`/list/${listId}`, {
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
    const t = i18n.t;

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    const { data: _bookCreated, error } = await supabase.rpc("create_book", {
        title_input: submission.value.title,
        list_id_input: listId,
        genre_id_input: submission.value.genre,
        author_input: submission.value.author,
        editor_input: submission.value.editor,
        library_code_input: submission.value.library_code,
        comment_input: submission.value.comment,
        isbn_input: submission.value.ISBN,
    });

    //success message
    session.flash("success", t("addBook.successMessage"));

    if (error) {
        console.error("Erreur RPC create_book:", error);
        return data({ errors: { form: t("addBook.errorMessage") } }, { status: 500 });
    }

    // Redirect after success
    return redirect(`/list/${listId}`, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function addBook(props: Route.ComponentProps) {
    const { t } = useTranslation();
    const { genres } = props.loaderData;

    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>{t("meta.addBook.title")}</title>
            <meta name="description" content={t("meta.addBook.description")} />
            <meta property="og:title" content={t("meta.addBook.title")} />
            <meta property="og:description" content={t("meta.addBook.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="addBook.title">Add a book</Trans>
            </h1>

            <AddBookForm genres={genres} />
        </div>
    );
}
