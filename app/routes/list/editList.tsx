import { data, redirect, useLoaderData } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/editList";

import EditListForm from "~/components/list/editListForm";
import { getOneList, updateList } from "~/db/list";
import { authMiddleware } from "~/middlewares/authMiddleware";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Modifier la liste de livres" }];
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

type Errors = {
    name?: string;
    form?: string;
};

// load list data
export async function loader({ params, request }: Route.LoaderArgs) {
    const { supabase } = getSupabase(request);
    const listId = params.id;

    if (!listId) {
        throw new Response("Missing list id", { status: 400 });
    }

    /*
    const { data, error } = await supabase.from("list").select().eq("id", listId).single();

    if (error) {
        throw new Response(error.message, { status: 500 });
    }
    */
    const list = await getOneList(supabase, { listId });

    return { list };
}

// update list
export async function action({ request, params }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);

    const formData = await request.formData();
    const name = String(formData.get("name"));
    const listId = params.id;

    // error handling
    const errors: Errors = {};

    if (!name) {
        errors.name = "Nom de la liste obligatoire";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    // updating list in database
    /*
    const { error } = await supabase.from("list").update({ name }).eq("id", id);

    if (error) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la modification de la liste" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    */
    try {
        await updateList(supabase, { listId, name });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la modification de la liste" } }, { status: 500 });
    }

    // Redirect after success
    return redirect("/");
}

export default function editList() {
    const { list } = useLoaderData();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <h1 className="h1">Modifier la liste {list.name}</h1>
            <EditListForm list={list} />
        </div>
    );
}
