import { data, Navigate, redirect, useOutletContext } from "react-router";

import type { Route } from "./+types/addList";
import { getSupabase } from "~/db/client";

import AddListForm from "~/components/list/addListForm";

import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";
import type { User } from "@supabase/supabase-js";

import { createList } from "~/db/list";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Ajouter une nouvelle liste de livres" }];
}

type ContextType = {
    user: User | null;
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

type Errors = {
    name?: string;
    form?: string;
};

export async function action(params: Route.ActionArgs) {
    const { supabase } = getSupabase(params.request);
    const user = getCurrentUser(params.context);
    if (!user) {
        return redirect("/landing");
    }

    const formData = await params.request.formData();
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
    /*
    const { error } = await supabase.from("list").insert([{ name }]);

    if (error) {
        console.error(error);
        return new Response(JSON.stringify({ errors: { form: "Erreur lors de la création de la liste" } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    */

    try {
        await createList(supabase, { userId: user.id, name });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la création de la liste" } }, { status: 500 });
    }

    // Redirect after success
    return redirect("/");
}

export default function addList() {
    const { user } = useOutletContext<ContextType>();
    //redirect if no user logged in
    if (!user) {
        return <Navigate to="/landing" replace />;
    }
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <h1 className="h1">Créer une liste</h1>
            <AddListForm />
        </div>
    );
}
