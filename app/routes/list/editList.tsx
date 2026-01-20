import { data, redirect, useLoaderData } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/editList";

import { getOneList, updateList } from "~/db/list";
import { commitSession, getSession } from "~/services/sessions.server";

import EditListForm from "~/components/list/editListForm";
import { schema } from "~/components/list/editListForm";

import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

// load list data
export async function loader({ params, request }: Route.LoaderArgs) {
    const { supabase } = getSupabase(request);

    const listId = params.id;

    if (!listId) {
        throw new Response("Missing list id", { status: 400 });
    }

    const list = await getOneList(supabase, listId);

    return list;
}

// update list
export async function action({ request, params }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const session = await getSession(request.headers.get("Cookie"));

    const formData = await request.formData();
    const listId = params.id;

    if (!listId) {
        session.flash("error", "Identifiant de la liste manquant");
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    // Parse object
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    // updating list in database
    try {
        await updateList(supabase, { listId, name: submission.value.name });
        //success message
        session.flash("success", "Liste modifiée avec succès!");
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la modification de la liste" } }, { status: 500 });
    }

    // Redirect after success
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function editList() {
    const { list } = useLoaderData();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>BookLover - Modifier une liste</title>
            <meta name="description" content="Modifer une liste de lecture BookLover" />
            <meta property="og:title" content="BookLover - Modifier une liste" />
            <meta property="og:description" content="L'application qui facilite vos lectures." />

            {/* Content */}
            <h1 className="h1">Modifier la liste {list.name}</h1>
            <EditListForm list={list} />
        </div>
    );
}
