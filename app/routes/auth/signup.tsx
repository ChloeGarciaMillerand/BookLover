import { data, Link, redirect } from "react-router";

import type { Route } from "./+types/signup";
import { getSupabase } from "~/db/client";
import { signup } from "~/db/auth";

import SignupForm from "~/components/auth/SignupForm";

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

    // signup
    const { supabase, headers } = getSupabase(request);
    try {
        await signup({ supabase, credentials: { email, password } });
    } catch (err: any) {
        // check if email already exists
        if (err?.message?.includes("already registered") || err?.message?.includes("User already registered")) {
            errors.email = "Cet email est déjà utilisé";
        } else {
            errors.form = "Erreur lors de la création du compte";
        }

        return new Response(JSON.stringify({ errors }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Redirect after success
    return redirect("/signup-success", { headers });
}

export default function SignupPage() {
    return (
        <div className="m-auto w-3/5 md:w-3/10 lg:w-1/5 mt-4">
            <h1 className="h1">Inscription</h1>
            <SignupForm />

            <div className="divider "></div>

            <div>
                <p className="mb-3">Déjà un compte?</p>
                <Link to="/signin" className="btn btn-primary">
                    Se connecter
                </Link>
            </div>
        </div>
    );
}
