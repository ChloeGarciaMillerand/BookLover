import type { MySupabaseClient } from "./client";

export async function getUserLists(supabase: MySupabaseClient, { userId }: { userId: string }) {
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
            .filter((entry) => entry.book !== null)
            .map((entry) => ({
                id: entry.book!.id,
                title: entry.book!.title,
                author: entry.book!.author ?? undefined,
                genre: entry.book!.genre
                    ? {
                          id: entry.book!.genre.id,
                          name: entry.book!.genre.name,
                          color: entry.book!.genre.color,
                      }
                    : undefined,
            })),
    }));

    return lists;
}

// Infer the return type of the function
// Awaited = Give me the result of the promise (as the function is async)
// ReturnType = Give me the type of the function result (here a promise)
// export type HomePageList = Awaited<ReturnType<typeof getUserLists>>;

export async function createList(supabase: MySupabaseClient, { userId, name }: { userId: string; name: string }) {
    const { data, error } = await supabase.from("list").insert([{ name, user_id: userId }]);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
