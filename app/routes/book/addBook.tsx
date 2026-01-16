import { data, redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";

import type { Route } from "./+types/addBook";
import { getSupabase } from "~/db/client";

import AddBookForm from "~/components/book/addBookForm";

import { getAllGenres } from "~/db/genre";
import { schema } from "~/components/book/addBookForm";

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
export async function action({ params, request }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);

    const listId = params.id;
    if (!listId) {
        return data({ errors: { form: "Liste invalide" } }, { status: 400 });
    }

    const formData = await request.formData();

    // Parse object
    const submission = parseWithZod(formData, { schema });

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

    if (error) {
        console.error("Erreur RPC create_book:", error);
        return data({ errors: { form: "Erreur lors de la création du livre" } }, { status: 500 });
    }

    // Redirect after success
    return redirect(`/list/${listId}`);
}

export default function addBook(props: Route.ComponentProps) {
    const { genres } = props.loaderData;

    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>BookLover - Ajouter un livre</title>
            <meta name="description" content="Ajouter un nouveau livre à votre liste de lecture BookLover" />
            <meta property="og:title" content="BookLover - Ajouter un livre" />
            <meta property="og:description" content="L'application qui facilite vos lectures" />

            {/* Content */}
            <h1 className="h1">Ajouter un livre</h1>
            <AddBookForm genres={genres} />
        </div>
    );
}
