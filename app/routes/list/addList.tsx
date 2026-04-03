import { data, redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod/v4";
import { getInstance } from "~/middlewares/i18next";
import { Trans, useTranslation } from "react-i18next";

import { getSupabase } from "~/db/client";

import type { Route } from "./+types/addList";

import { createList } from "~/db/list";
import { commitSession, getSession } from "~/services/sessions.server";

import AddListForm from "~/components/list/addListForm";
import { createSchema } from "~/components/list/addListForm";

import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action(params: Route.ActionArgs) {
    const { supabase } = getSupabase(params.request);
    const session = await getSession(params.request.headers.get("Cookie"));

    const user = getCurrentUser(params.context);
    if (!user) {
        return redirect("/landing");
    }

    const formData = await params.request.formData();

    // Parse object
    const i18n = getInstance(params.context);
    const schema = createSchema(i18n.t);
    const submission = parseWithZod(formData, { schema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    // list registration in database
    const t = i18n.t;

    try {
        await createList(supabase, { userId: user.id, name: submission.value.name });
        //success message
        session.flash("success", t("createList.successMessage"));
    } catch (error) {
        console.error(error);
        return data({ errors: { form: t("createList.errorMessage") } }, { status: 500 });
    }

    // Redirect after success
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function addList() {
    const { t } = useTranslation();
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            {/* Meta*/}
            <title>{t("meta.addList.title")}</title>
            <meta name="description" content={t("meta.addList.description")} />
            <meta property="og:title" content={t("meta.addList.title")} />
            <meta property="og:description" content={t("meta.addList.description")} />

            {/* Content */}
            <h1 className="h1">
                <Trans i18nKey="createList.title">Create a List </Trans>
            </h1>

            <AddListForm />
        </div>
    );
}
