import { data, redirect, useLoaderData } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/editBook";

import EditBookForm from "~/components/book/editBookForm";
import { getOneBookWithGenre, updateBook } from "~/db/book";
import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";
import { getUserLists } from "~/db/list";
import { getCurrentListId, updateBookList } from "~/db/booklist";
import { getAllGenres } from "~/db/genre";
import { schema } from "~/components/book/editBookForm";

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
export async function action({ request, params }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);

    const { bookId } = params;

    if (!bookId) {
        throw new Response("Missing book id", { status: 400 });
    }

    const formData = await request.formData();

    // Parse object
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    // updating book in database
    const { title, genre_id, list_id, author, editor, library_code, comment, ISBN } = submission.value;

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

        // Redirect after success
        return redirect(`/list/${list_id}`);
    } catch {
        return data({ errors: { form: "Erreur lors de la modification du livre" } }, { status: 500 });
    }
}

export default function editBook() {
    const { book, genres, lists, currentListId } = useLoaderData();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>BookLover - Modifier un livre</title>
            <meta name="description" content="Modifier un livre de votre liste de lecture BookLover" />
            <meta property="og:title" content="BookLover - Modifier un livre" />
            <meta property="og:description" content="L'application qui facilite vos lectures" />

            {/* Content */}
            <h1 className="h1">Modifier le livre {book.title}</h1>
            <EditBookForm genres={genres} book={book.book} lists={lists} currentListId={currentListId} />
        </div>
    );
}
