import { data } from "react-router";

import { supabase } from "~/db/client";
import type { Route } from "./+types/addGenre";

type Errors = {
    name?: string;
    color?: string;
    form?: string;
};

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const name = String(formData.get("name"));
    const color = String(formData.get("color"));

    // error handling
    const errors: Errors = {};

    if (!name) {
        errors.name = "Le nom du genre est requis";
    }

    if (!color) {
        errors.color = "Une couleur est requise";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    const { data: genre, error } = await supabase.from("genre").insert({ name, color }).select().single();

    if (error) {
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la création du genre" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return data({ genre });
}
