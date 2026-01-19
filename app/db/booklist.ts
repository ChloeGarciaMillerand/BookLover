import type { MySupabaseClient } from "./client";

export async function getCurrentListId(supabase: MySupabaseClient, { bookId }: { bookId: string }) {
    const { data, error } = await supabase.from("booklist").select("list_id").eq("book_id", bookId).single();

    if (error) {
        throw new Response(error.message, { status: 500 });
    }

    return data.list_id;
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

export async function updateBookList(
    supabase: MySupabaseClient,
    {
        bookId,
        listId,
    }: {
        bookId: string;
        listId: string;
    },
) {
    const { error } = await supabase.from("booklist").update({ list_id: listId }).eq("book_id", bookId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function deleteLinkBookList(
    supabase: MySupabaseClient,
    {
        bookId,
        listId,
    }: {
        bookId: string;
        listId: string;
    },
) {
    const { error } = await supabase.from("booklist").delete().eq("book_id", bookId).eq("list_id", listId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function removeBooksLinksInList(supabase: MySupabaseClient, { listId }: { listId: string }) {
    const { error } = await supabase.from("booklist").delete().eq("list_id", listId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function getBooksIdsInList(supabase: MySupabaseClient, { listId }: { listId: string }) {
    const { data, error } = await supabase.from("booklist").select("book_id").eq("list_id", listId);

    if (error) throw new Error(error.message);

    return data.map(({ book_id }) => book_id).filter((id): id is string => id !== null);
}
