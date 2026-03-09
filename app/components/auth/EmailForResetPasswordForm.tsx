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
                    {/* Email */}
                    <fieldset className="fieldset">
                        <label htmlFor="email">Email*</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="input w-full"
                            placeholder="john.doe@mail.com"
                            aria-describedby={actionData?.errors?.email ? "email-error" : undefined}
                        />
                        {actionData?.errors?.email ? (
                            <p className="text-error mt-1 text-sm" id="email-error">
                                {actionData?.errors?.email}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* submit button */}
                    <div className="mt-5 flex justify-end md:justify-start">
                        <Button type="submit" className="btn-primary">
                            Recevoir un lien de réinitialisation
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}
