import { data, redirect } from "react-router";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/updatePassword";

import { resetPasswordRequest } from "~/db/auth";
import EmailForResetPasswordForm from "~/components/auth/EmailForResetPasswordForm";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "Réinitialisez votre mot de passe" }];
}

type Errors = { email?: string; form?: string };

export async function action({ request }: any) {
    const formData = await request.formData();
    const email = String(formData.get("email"));

    const errors: Errors = {};
    if (!email) errors.email = "L'email est obligatoire";

    if (Object.keys(errors).length > 0) return data({ errors }, { status: 400 });

    const { supabase, headers } = getSupabase(request);

    try {
        await resetPasswordRequest({ supabase, email });
    } catch (error: any) {
        return data({ errors: { form: error.message } }, { status: 400 });
    }

    return redirect("/check-email", { headers });
}

export default function ForgotPasswordPage() {
    return (
        <div className="m-auto w-3/5 md:w-3/10 lg:w-1/5 mt-4">
            <h1 className="h1">Mot de passe oublié?</h1>
            <p>Rentrez votre email pour recevoir un lien de réinitialisation du mot de passe</p>
            <EmailForResetPasswordForm />
        </div>
    );
}
