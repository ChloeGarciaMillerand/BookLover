import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import type { Database } from "~/types/database.types";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
