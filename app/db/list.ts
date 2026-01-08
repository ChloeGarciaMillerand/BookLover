import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

export async function getUserLists(supabase: SupabaseClient<Database>, { userId }: { userId: string }) {
    const { data, error } = await supabase
        .from("list")
        .select(`
                id,
                name,
                organization (
                    id,
                    name
                ),
                booklist (
                    book (
                        id,
                        title,
                        author,
                        genre (
                            id,
                            name,
                            color
                        )
                    )
                )
            `)
        .eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }

    const supabaseLists = data;

    const lists = supabaseLists.map((list) => ({
        id: list.id,
        name: list.name,
        organization: list.organization ?? undefined,
        books: list.booklist
            .flatMap((entry) => entry.book ?? [])
            .map((book) => {
                const genre = book.genre ?? undefined;
                return {
                    id: book.id,
                    title: book.title,
                    author: book.author ?? undefined,
                    genre: genre
                        ? {
                              id: genre.id,
                              name: genre.name,
                              color: genre.color,
                          }
                        : undefined,
                };
            }),
    }));

    return lists;
}
