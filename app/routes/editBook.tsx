import { data, redirect, useLoaderData } from "react-router";

import { supabase } from "~/db/client";
import type { Route } from "./+types/editBook";

import EditBookForm from "~/components/editBookForm";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Modifier un livre" }];
}

type Errors = {
    name?: string;
    form?: string;
};

export async function loader({ params }: Route.LoaderArgs) {
    const { bookId } = params;

    if (!bookId) {
        throw new Response("Missing book id", { status: 400 });
    }

    // load book data + genre
    const { data: book, error: bookError } = await supabase
        .from("book")
        .select(`*, genre(*)`)
        .eq("id", bookId)
        .single();

    if (bookError) {
        throw new Response(bookError.message, { status: 500 });
    }

    // load lists
    const { data: lists, error: listsError } = await supabase.from("list").select();

    if (listsError) {
        throw new Response(listsError.message, { status: 500 });
    }

    // load current list
    const { data: bookList, error: bookListError } = await supabase
        .from("booklist")
        .select("list_id")
        .eq("book_id", bookId)
        .single();

    if (bookListError) {
        throw new Response(bookListError.message, { status: 500 });
    }

    // load genres
    const { data: genres, error: genresError } = await supabase.from("genre").select();

    if (genresError) {
        throw new Response(genresError.message, { status: 500 });
    }

    return { book, lists, genres, currentListId: bookList.list_id };
}

// update book
export async function action({ request, params }: Route.ActionArgs) {
    const { bookId } = params;

    if (!bookId) {
        throw new Response("Missing book id", { status: 400 });
    }

    const formData = await request.formData();

    const title = String(formData.get("title"));
    const genre_id = String(formData.get("genre"));
    const list_id = String(formData.get("list_id"));
    const author = String(formData.get("author"));
    const editor = String(formData.get("editor"));
    const library_code = String(formData.get("library_code"));
    const comment = String(formData.get("comment"));
    const ISBN = String(formData.get("ISBN"));

    // error handling
    const errors: Errors = {};

    if (!title) {
        errors.name = "Le titre du livre est requis";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    // updating book in database
    const { error } = await supabase
        .from("book")
        .update({ title, genre_id, author, editor, library_code, comment, ISBN })
        .eq("id", bookId);

    if (error) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la modification du livre" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    // update list relation
    await supabase.from("booklist").update({ list_id }).eq("book_id", bookId);

    // Redirect after success
    return redirect(`/list/${list_id}`);
}

export default function Book() {
    const { book, genres, lists, currentListId } = useLoaderData();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <h1 className="h1">Modifier le livre {book.title}</h1>
            <EditBookForm genres={genres} book={book} lists={lists} currentListId={currentListId} />
        </div>
    );
}
