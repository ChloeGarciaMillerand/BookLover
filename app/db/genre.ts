import type { MySupabaseClient } from "./client";
import type { Genre } from "~/types";

export async function getUsersGenres(supabase: MySupabaseClient, { userId }: { userId: string }): Promise<Genre[]> {
    const { data, error } = await supabase.from("genre").select().eq("user_id", userId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getAllGenres(supabase: MySupabaseClient, { userId }: { userId: string }): Promise<Genre[]> {
    const { data, error } = await supabase.from("genre").select().or(`user_id.eq.${userId},user_id.is.null`);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
