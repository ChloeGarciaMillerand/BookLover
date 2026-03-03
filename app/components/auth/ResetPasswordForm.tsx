import { Form, useActionData } from "react-router";

import { Button } from "../shared/Button";

export default function ResetPasswordForm() {
    const actionData = useActionData();

    return (
        <>
            {/*returns form-related errors (e.g. user name is required)*/}
            <Form method="POST">
                {actionData?.errors.form ? (
                    <p className="register-error-text" role="alert">
                        {actionData?.errors?.form}
                    </p>
                ) : null}
                {/* form fields */}
                <div>
                    {/* New password */}
                    <fieldset className="fieldset">
                        <label htmlFor="password">Nouveau mot de passe*</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="input w-full"
                            placeholder="Votre nouveau mot de passe"
                            aria-describedby={actionData?.errors?.password ? "password-error" : undefined}
                        />
                        {actionData?.errors?.password ? (
                            <p className="text-error mt-1 text-sm" id="password-error">
                                {actionData?.errors?.password}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* Confirm password */}
                    <fieldset className="fieldset">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe*</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            className="input w-full"
                            placeholder="Votre mot de passe"
                            aria-describedby={actionData?.errors?.confirmPassword ? "confirmPassword-error" : undefined}
                        />
                        {actionData?.errors?.confirmPassword ? (
                            <p className="text-error mt-1 text-sm" id="confirmPassword-error">
                                {actionData?.errors?.confirmPassword}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* submit button */}
                    <div className="mt-5 flex justify-end md:justify-start">
                        <Button type="submit" className="btn-primary">
                            Réinitialiser le mot de passe
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}
