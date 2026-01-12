import type { MySupabaseClient } from "./client";

export async function getCurrentListId(supabase: MySupabaseClient, { bookId }: { bookId: string }) {
    const { data, error } = await supabase.from("booklist").select("list_id").eq("book_id", bookId).single();

    if (error) {
        throw new Response(error.message, { status: 500 });
    }

    return data.list_id;
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
