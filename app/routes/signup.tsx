import { data, redirect } from "react-router";
import type { Route } from "./+types/signup";
import { getSupabase } from "~/db/client";
import { signup } from "~/db/auth";

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
    } catch {
        // TODO
    }

    // Redirect after success
    return redirect("/", { headers });
}

//TODO: page + component
export default function SignupPage() {}
