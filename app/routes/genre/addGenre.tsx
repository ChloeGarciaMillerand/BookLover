import { data, redirect, useFetcher } from "react-router";
import { Trans } from "react-i18next";
import { getInstance } from "~/middlewares/i18next";
import { useEffect } from "react";

import type { Route } from "./+types/addGenre";
import { getSupabase } from "~/db/client";
import { createGenre } from "~/db/genre";
import { authMiddleware, getCurrentUser } from "~/middlewares/authMiddleware";

import { Button } from "~/components/shared/Button";

type Errors = {
    name?: string;
    color?: string;
    form?: string;
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ request, context }: Route.ActionArgs) {
    const { supabase } = getSupabase(request);
    const user = getCurrentUser(context);
    if (!user) {
        return redirect("/landing");
    }

    const formData = await request.formData();
    const name = String(formData.get("name"));
    const color = String(formData.get("color"));

    // error handling
    const errors: Errors = {};

    //translation
    const i18n = getInstance(context);
    const t = i18n.t;

    if (!name) {
        errors.name = t("addGenre.nameErrorMessage");
    }

    if (!color) {
        errors.color = t("addGenre.colorErrorMessage");
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    try {
        const genre = await createGenre(supabase, { userId: user.id, name, color });
        return data({ genre }, { status: 201 });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: t("addGenre.errorMessage") } }, { status: 500 });
    }
}

// modal to add a new genre
export function AddGenreModal({ onClose }: { onClose: () => void }) {
    // used to create new genres
    const fetcher = useFetcher();

    // close the modal after creating a new genre
    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.genre) {
            onClose();
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    <Trans i18nKey="addGenre.addGenreTitle">Add a genre</Trans>
                </h3>

                <fetcher.Form method="POST" action="/add-genre">
                    <fieldset className="fieldset">
                        <label htmlFor="name">
                            <Trans i18nKey="addGenre.nameLabel">Name</Trans>
                        </label>
                        <input id="name" name="name" className="input" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label htmlFor="color">
                            <Trans i18nKey="addGenre.colorLabel">Color</Trans>
                        </label>
                        <input id="color" name="color" type="color" />
                    </fieldset>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" onClick={onClose}>
                            <Trans i18nKey="addGenre.cancelButton">Cancel</Trans>
                        </Button>
                        <Button type="submit" className="btn-primary">
                            <Trans i18nKey="addGenre.submitButton">Create</Trans>
                        </Button>
                    </div>
                </fetcher.Form>
            </div>
        </dialog>
    );
}
