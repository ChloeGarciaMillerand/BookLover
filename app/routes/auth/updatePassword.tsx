import { data, redirect } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/updatePassword";

import { updatePassword } from "~/db/auth";
import ResetPasswordForm from "~/components/auth/ResetPasswordForm";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Réinitialisez votre mot de passe" }];
}

type Errors = {
    email?: string;
    password?: string;
    form?: string;
};

export async function loader({ request }: Route.LoaderArgs) {
    const { supabase, headers } = getSupabase(request);

    //start a new session to get the access token from the url
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            throw redirect("/signin");
        }
    }

    return data({}, { headers });
}

export async function action({ request }: Route.ActionArgs) {
    const { supabase, headers } = getSupabase(request);

    const formData = await request.formData();
    const password = String(formData.get("password"));

    // error handling
    const errors: Errors = {};

    if (!password) {
        errors.password = "Le mot de passe est obligatoire";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    //update password

    try {
        await updatePassword({ supabase, password });
    } catch (error: any) {
        return data(
            {
                errors: {
                    form: error?.message ?? "Erreur lors de la modification du mot de passe",
                },
            },
            { status: 401 },
        );
    }

    // Redirect after success
    return redirect("/signin", { headers });
}

export default function UpdatePasswordPage() {
    return (
        <div className="m-auto w-3/5 md:w-3/10 lg:w-1/5 mt-4">
            <h1 className="h1">Réinitialisation du mot de passe</h1>
            <ResetPasswordForm />
        </div>
    );
}
