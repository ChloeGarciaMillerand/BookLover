import { redirect } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/signout";
import { signout } from "~/db/auth";

export default async function action({ request }: Route.ActionArgs) {
    // signout
    const { supabase, headers } = getSupabase(request);
    try {
        await signout({ supabase });
    } catch {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la déconnexion" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Redirect after success
    return redirect("/", { headers });
}
