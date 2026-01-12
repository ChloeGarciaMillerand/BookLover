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

export async function getOneBookWithGenre(supabase: MySupabaseClient, bookId: string) {
    const { data, error } = await supabase.from("book").select(`*, genre(*)`).eq("id", bookId).single();

    if (error) {
        throw new Response(error.message, { status: 500 });
    }

    return { book: data };
}

export async function updateBook(
    supabase: MySupabaseClient,
    {
        bookId,
        title,
        genre_id,
        author,
        editor,
        library_code,
        comment,
        ISBN,
    }: {
        bookId: string;
        title: string;
        genre_id?: string;
        author?: string;
        editor?: string;
        library_code?: string;
        comment?: string;
        ISBN?: string;
    },
) {
    const { error } = await supabase
        .from("book")
        .update({ title, genre_id, author, editor, library_code, comment, ISBN })
        .eq("id", bookId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function removeBook(supabase: MySupabaseClient, { bookId }: { bookId: string }) {
    const { error } = await supabase.from("book").delete().eq("id", bookId);

    if (error) {
        throw new Error(error.message);
    }
}
