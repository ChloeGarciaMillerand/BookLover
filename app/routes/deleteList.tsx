import { redirect } from "react-router";

import { supabase } from "~/db/client";
import type { Route } from "./+types/deleteList";

export async function action({ params }: Route.ActionArgs) {
    const id = params.id;

    const { error } = await supabase.from("list").delete().eq("id", id);

    if (error) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la suppression de la liste" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return redirect("/");
}
