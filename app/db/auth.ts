import type { SupabaseClient } from "@supabase/supabase-js";

type Credentials = {
    email: string;
    password: string;
};

export async function signup(options: { supabase: SupabaseClient; credentials: Credentials }) {
    const { error } = await options.supabase.auth.signUp(options.credentials);

    if (error) {
        throw error;
    }
}

export async function signin(options: { supabase: SupabaseClient; credentials: Credentials }) {
    const { error } = await options.supabase.auth.signInWithPassword(options.credentials);

    if (error) {
        throw error;
    }
}

export async function signout(options: { supabase: SupabaseClient }) {
    const { error } = await options.supabase.auth.signOut({ scope: "local" });

    if (error) {
        throw error;
    }
}
