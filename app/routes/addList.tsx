import { data, redirect } from "react-router";

import type { Route } from "./+types/addList";
import { supabase } from "~/db/client";

import AddListForm from "~/components/addListForm";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Ajouter une nouvelle liste de livres" }];
}

type Errors = {
    name?: string;
    form?: string;
};

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const name = String(formData.get("name"));

    // error handling
    const errors: Errors = {};

    if (!name) {
        errors.name = "Nom de la liste obligatoire";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    // list registration in database
    const { error } = await supabase.from("list").insert([{ name }]);

    if (error) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la création de la liste" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Redirect after success
    return redirect("/");
}

export default function addList() {
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <h1 className="h1">Créer une liste</h1>
            <AddListForm />
        </div>
    );
}
