import { data, redirect, useLoaderData } from "react-router";

import { supabase } from "~/db/client";
import type { Route } from "./+types/editList";

import EditListForm from "~/components/editListForm";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Modifier la liste de livres" }];
}

type Errors = {
    name?: string;
    form?: string;
};

// load list data
export async function loader(args: Route.LoaderArgs) {
    const listId = args.params.id;

    if (!listId) {
        throw new Response("Missing list id", { status: 400 });
    }

    const { data, error } = await supabase.from("list").select().eq("id", listId).single();

    if (error) {
        throw new Response(error.message, { status: 500 });
    }

    return { list: data };
}

// update list
export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData();
    const name = String(formData.get("name"));
    const id = params.id;

    // error handling
    const errors: Errors = {};

    if (!name) {
        errors.name = "Nom de la liste obligatoire";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    // updating list in database
    const { error } = await supabase.from("list").update({ name }).eq("id", id);

    if (error) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la modification de la liste" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
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
