import { createClient } from "@supabase/supabase-js";
import "dotenv/config.js";

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(requiredEnv("SUPABASE_URL"), requiredEnv("SUPABASE_KEY"));
