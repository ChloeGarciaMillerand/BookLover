import type { MySupabaseClient } from "./client";

export async function createBook(
    supabase: MySupabaseClient,
    {
        title,
        genre_id,
        author,
        editor,
        library_code,
        comment,
        ISBN,
    }: {
        title: string;
        genre_id?: string;
        author?: string;
        editor?: string;
        library_code?: string;
        comment?: string;
        ISBN?: string;
    },
) {
    const { data, error } = await supabase
        .from("book")
        .insert([{ title, genre_id, author, editor, library_code, comment, ISBN }])
        .select()
        .single();

    if (error || !data) {
        throw new Error(error?.message || "Erreur lors de l'ajout du livre");
    }

    return data;
}

export async function addBookToList(
    supabase: MySupabaseClient,
    { bookId, listId }: { bookId: string; listId: string },
) {
    const { error } = await supabase.from("booklist").insert([
        {
            book_id: bookId,
            list_id: listId,
        },
    ]);

    if (error) {
        throw new Error(error.message);
    }
}
