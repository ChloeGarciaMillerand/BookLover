import { data, Link, redirect } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/signin";
import { signin } from "~/db/auth";

import SigninForm from "~/components/auth/SigninForm";

export function meta(_args: Route.MetaArgs) {
    return [
        { title: "BookLover" },
        { name: "description", content: "Créez un compte pour gérer vos livres facilement!" },
    ];
}

type Errors = {
    email?: string;
    password?: string;
    form?: string;
};

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    // error handling
    const errors: Errors = {};

    if (!email) {
        errors.email = "L'email est obligatoire";
    }

    if (!password) {
        errors.password = "Le mot de passe est obligatoire";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    //signin
    const { supabase, headers } = getSupabase(request);
    try {
        await signin({ supabase, credentials: { email, password } });
    } catch (error: any) {
        return data(
            {
                errors: {
                    form: error?.message ?? "Identifiants invalides",
                },
            },
            { status: 401 },
        );
    }

    // Redirect after success
    return redirect("/", { headers });
}

export default function SigninPage() {
    return (
        <div className="m-auto w-4/5 md:w-2/5 mt-4">
            <h1 className="h1">Connexion</h1>
            <SigninForm />
            <div className="mt-10">
                <p className="mb-3">Pas encore de compte?</p>
                <Link to="/signup" className="btn btn-primary">
                    S'inscrire
                </Link>
            </div>
        </div>
    );
}
