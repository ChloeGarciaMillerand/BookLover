import { createClient } from "@supabase/supabase-js";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import "dotenv/config";
import type { Database } from "~/types/database.types";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const getSupabase = (request: Request) => {
    const headers = new Headers();

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
                return cookies.map((cookie) => ({
                    name: cookie.name,
                    value: cookie.value ?? "",
                }));
            },

            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    headers.append("Set-Cookie", serializeCookieHeader(name, value, options)),
                );
            },
        },
    });

    return { supabase, headers };
};
