import { data, redirect, useLoaderData } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/editList";

import { authMiddleware } from "~/middlewares/authMiddleware";

import EditListForm from "~/components/list/editListForm";
import { getOneList, updateList } from "~/db/list";
import { schema } from "~/components/list/editListForm";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

// load list data
export async function loader({ params, request }: Route.LoaderArgs) {
    console.log("Loader called with params:", params);
    const { supabase } = getSupabase(request);
    const listId = params.id;

    if (!listId) {
        throw new Response("Missing list id", { status: 400 });
    }

    const list = await getOneList(supabase, listId);

    console.log("Loader fetched list:", list);

    return list;
}

// update list
export async function action({ request, params }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);

    const formData = await request.formData();
    const name = String(formData.get("name"));
    const listId = params.id;

    // error handling
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    // updating list in database
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
    console.log("list loader data:", list);
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
