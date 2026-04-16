import { data, redirect, useLoaderData } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/editList";

import { getOneList, updateList } from "~/db/list";
import { commitSession, getSession } from "~/services/sessions.server";

import EditListForm from "~/components/list/editListForm";
import { createSchema } from "~/components/list/editListForm";

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
export async function action({ request, params, context }: Route.ActionArgs) {
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
    const i18n = getInstance(context);
    const schema = createSchema(i18n.t);
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    // updating list in database
    const t = i18n.t;
    try {
        await updateList(supabase, { listId, name: submission.value.name });
        //success message
        session.flash("success", t("editList.successMessage"));
    } catch (error) {
        console.error(error);
        return data({ errors: { form: t("editList.errorMessage") } }, { status: 500 });
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
    const { t } = useTranslation();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>{t("meta.editList.title")}</title>
            <meta name="description" content={t("meta.editList.description")} />
            <meta property="og:title" content={t("meta.editList.title")} />
            <meta property="og:description" content={t("meta.editList.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="editList.title" values={{ name: list.name }}>
                    Edit {{ name: list.name }} list
                </Trans>
            </h1>
            <EditListForm list={list} />
        </div>
    );
}
