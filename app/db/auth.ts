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

export async function resetPasswordRequest(options: { supabase: SupabaseClient; email: string }) {
    const redirectTo = `${import.meta.env.VITE_APP_URL}/update-password`;
    const { error } = await options.supabase.auth.resetPasswordForEmail(options.email, { redirectTo });

    if (error) {
        throw error;
    }
}

export async function updatePassword(options: { supabase: SupabaseClient; password: string }) {
    const { error } = await options.supabase.auth.updateUser({
        password: options.password,
    });

    if (error) {
        throw error;
    }
}
