import { redirect, data } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/deleteList";
import { removeList } from "~/db/list";

export async function action({ params, request }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);

    const listId = params.id;
    if (!listId) {
        return data({ errors: { form: "Identifiant de liste invalide" } }, { status: 400 });
    }

    /*
    const { error } = await supabase.from("list").delete().eq("id", id);

    if (error) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la suppression de la liste" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    */

    try {
        await removeList(supabase, { listId });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la suppression de la liste" } }, { status: 500 });
    }

    return redirect("/");
}
