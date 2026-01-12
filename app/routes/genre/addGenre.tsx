import { data, redirect, useFetcher } from "react-router";
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

    if (!name) {
        errors.name = "Le nom du genre est requis";
    }

    if (!color) {
        errors.color = "Une couleur est requise";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    try {
        const genre = await createGenre(supabase, { userId: user.id, name, color });
        return data({ genre }, { status: 201 });
    } catch (error) {
        console.error(error);
        return data({ errors: { form: "Erreur lors de la création du genre" } }, { status: 500 });
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
                <h3 className="font-bold text-lg">Ajouter un genre</h3>

                <fetcher.Form method="POST" action="/add-genre">
                    <fieldset className="fieldset">
                        <label htmlFor="name">Nom</label>
                        <input id="name" name="name" className="input" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label htmlFor="color">Couleur</label>
                        <input id="color" name="color" type="color" />
                    </fieldset>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button type="submit" className="btn-primary">
                            Créer
                        </Button>
                    </div>
                </fetcher.Form>
            </div>
        </dialog>
    );
}
