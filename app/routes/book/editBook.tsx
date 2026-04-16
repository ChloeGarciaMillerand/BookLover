import { data, redirect, useLoaderData } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/editBook";

import { getCurrentListId, updateBookList } from "~/db/booklist";
import { getOneBookWithGenre, updateBook } from "~/db/book";
import { getUserLists } from "~/db/list";
import { getAllGenres } from "~/db/genre";
import { commitSession, getSession } from "~/services/sessions.server";

import EditBookForm from "~/components/book/editBookForm";
import { createSchema } from "~/components/book/editBookForm";

import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ params, request, context }: Route.LoaderArgs) {
    const { supabase } = getSupabase(request);
    const user = getCurrentUser(context);

    const { bookId } = params;

    if (!bookId) {
        throw new Response("Missing book id", { status: 400 });
    }

    // load book data + genre
    const book = await getOneBookWithGenre(supabase, bookId);
    // load lists
    const lists = await getUserLists(supabase, { userId: user.id });
    // load current list
    const currentListId = await getCurrentListId(supabase, { bookId });
    // load genres
    const genres = await getAllGenres(supabase, { userId: user.id });

    return { book, lists, genres, currentListId };
}

// update book
export async function action({ request, params, context }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const session = await getSession(request.headers.get("Cookie"));

    const { bookId, listId } = params;

    if (!bookId) {
        session.flash("error", "Identifiant manquant");
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

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    // updating book in database
    const { title, genre_id, list_id, author, editor, library_code, comment, ISBN } = submission.value;

    const t = i18n.t;

    try {
        // update book in database
        await updateBook(supabase, {
            bookId,
            title,
            genre_id,
            author,
            editor,
            library_code,
            comment,
            ISBN,
        });

        // update list relation
        await updateBookList(supabase, {
            bookId,
            listId: list_id,
        });

        //success message
        session.flash("success", t("editBook.successMessage"));

        // Redirect after success
        return redirect(`/list/${list_id}`, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch {
        return data({ errors: { form: t("editBook.errorMessage") } }, { status: 500 });
    }
}

export default function editBook() {
    const { t } = useTranslation();
    const { book, genres, lists, currentListId } = useLoaderData();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>{t("meta.editBook.description")}</title>
            <meta name="description" content={t("meta.editBook.description")} />
            <meta property="og:title" content={t("meta.editBook.title")} />
            <meta property="og:description" content={t("meta.editBook.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="editBook.title" values={{ title: book.book.title }}>
                    Edit "{book.book.title}" book
                </Trans>
            </h1>
            <EditBookForm genres={genres} book={book.book} lists={lists} currentListId={currentListId} />
        </div>
    );
}
