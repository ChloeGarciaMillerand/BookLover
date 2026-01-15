import { data, redirect } from "react-router";

import type { Route } from "./+types/addBook";
import { getSupabase } from "~/db/client";

import AddBookForm from "~/components/book/addBookForm";

import { getAllGenres } from "~/db/genre";
import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

type Errors = {
    title?: string;
    form?: string;
};

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

    const title = String(formData.get("title"));
    const genre_id = formData.get("genre") ? String(formData.get("genre")) : undefined;
    const author = formData.get("author") ? String(formData.get("author")) : undefined;
    const editor = formData.get("editor") ? String(formData.get("editor")) : undefined;
    const library_code = formData.get("library_code") ? String(formData.get("library_code")) : undefined;
    const comment = formData.get("comment") ? String(formData.get("comment")) : undefined;
    const ISBN = formData.get("ISBN") ? String(formData.get("ISBN")) : undefined;

    // error handling
    const errors: Errors = {};

    if (!title) {
        errors.title = "Le titre du livre est requis";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    // book registration in database
    /*
    let book;

    try {
        book = await createBook(supabase, { title, genre_id, author, editor, library_code, comment, ISBN });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la création de l'ajout du livre" } }, { status: 500 });
    }

    // link between the book and the list
    try {
        await addBookToList(supabase, { bookId: book.id, listId });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de l'ajout du livre'" } }, { status: 500 });
    }
    */
    const { data: _bookCreated, error } = await supabase.rpc("create_book", {
        title_input: title,
        list_id_input: listId,
        genre_id_input: genre_id,
        author_input: author,
        editor_input: editor,
        library_code_input: library_code,
        comment_input: comment,
        isbn_input: ISBN,
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
