import { Form, useActionData } from "react-router";

import { Button } from "./Button";

export default function SigninForm() {
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
                            className="input"
                            placeholder="john.doe@mail.com"
                            aria-describedby={actionData?.errors?.email ? "email-error" : undefined}
                        />
                        {actionData?.errors?.email ? (
                            <p className="register-error-text" id="email-error">
                                {actionData?.errors?.email}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* Password */}
                    <fieldset className="fieldset">
                        <label htmlFor="password">Mot de passe*</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="input"
                            placeholder="Votre mot de passe"
                            aria-describedby={actionData?.errors?.password ? "password-error" : undefined}
                        />
                        {actionData?.errors?.password ? (
                            <p className="register-error-text" id="password-error">
                                {actionData?.errors?.password}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* submit button */}
                    <div className="mt-5 flex justify-end md:justify-start">
                        <Button type="submit" className="btn-primary">
                            OK
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}
