import { getSupabase } from "~/db/client";
import type { Route } from "./+types/signout";
import { redirect } from "react-router";
import { signout } from "~/db/auth";

export default async function action({ request }: Route.ActionArgs) {
    // signout
    const { supabase, headers } = getSupabase(request);
    try {
        await signout({ supabase });
    } catch {
        // TODO
    }

    // Redirect after success
    return redirect("/", { headers });
}
