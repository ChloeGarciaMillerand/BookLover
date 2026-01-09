import { data, Navigate, redirect, useOutletContext } from "react-router";

import type { Route } from "./+types/addBook";
import { getSupabase } from "~/db/client";

import AddBookForm from "~/components/book/addBookForm";

import type { User } from "@supabase/supabase-js";
import { getAllGenres } from "~/db/genre";
import { addBookToList, createBook } from "~/db/book";
import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Ajouter un nouveau livre à votre liste" }];
}

type ContextType = {
    user: User | null;
};

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
    const genre_id = String(formData.get("genre"));
    const author = String(formData.get("author"));
    const editor = String(formData.get("editor"));
    const library_code = String(formData.get("library_code"));
    const comment = String(formData.get("comment"));
    const ISBN = String(formData.get("ISBN"));

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
    const { data: book, error: bookError } = await supabase
        .from("book")
        .insert([{ title, genre_id, author, editor, library_code, comment, ISBN }])
        .select()
        .single();

    if (bookError || !book) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de l'ajout du livre'" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    */
    let book;

    try {
        book = await createBook(supabase, { title, genre_id, author, editor, library_code, comment, ISBN });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la création de l'ajout du livre" } }, { status: 500 });
    }

    // link between the book and the list
    /*
    const { error: booklistError } = await supabase.from("booklist").insert([
        {
            book_id: book.id,
            list_id: listId,
        },
    ]);

    if (booklistError) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de l'ajout du livre'" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    */
    try {
        await addBookToList(supabase, { bookId: book.id, listId });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de l'ajout du livre'" } }, { status: 500 });
    }

    // Redirect after success
    return redirect(`/list/${listId}`);
}

export default function addList(props: Route.ComponentProps) {
    const { user } = useOutletContext<ContextType>();
    const { genres } = props.loaderData;

    //redirect if no user logged in
    if (!user) {
        return <Navigate to="/landing" replace />;
    }
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <h1 className="h1">Ajouter un livre</h1>
            <AddBookForm genres={genres} />
        </div>
    );
}
