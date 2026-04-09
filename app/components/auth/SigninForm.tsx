import { Form, useActionData } from "react-router";
import type { TFunction } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import { Button } from "../shared/Button";

export const createSchema = (t: TFunction) =>
    z.object({
        email: z.string({ message: t("signin.emailRequired") }).email({ message: t("signin.emailInvalid") }),
        password: z.string({ message: t("signin.passwordRequired") }).min(1),
    });

export default function SigninForm() {
    //translation
    const { t } = useTranslation();
    const schema = createSchema(t);

    // validation data from last submit (server or client side)
    const lastResult = useActionData();

    // build HTML constraints from Zod schema
    const [form, fields] = useForm({
        lastResult,
        constraint: getZodConstraint(schema),
        // Validate field once user leaves the field
        shouldValidate: "onBlur",
        // Then, revalidate field as user types again
        shouldRevalidate: "onInput",
        // Run the same validation logic on client with Zod
        onValidate({ formData }) {
            return parseWithZod(formData, { schema });
        },
    });

    return (
        <>
            {/*returns form-related errors (e.g. user name is required)*/}
            <Form method="POST" {...getFormProps(form)}>
                <div id={form.errorId}>{form.errors}</div>
                {/* form fields */}
                <div>
                    {/* Email */}
                    <div className="fieldset">
                        <label className="fieldset-legend inline-block" htmlFor={fields.email.id}>
                            <Trans i18nKey="signin.emailLabel">
                                Email <span aria-hidden="true">*</span>
                            </Trans>
                        </label>
                        <input
                            className="input"
                            {...getInputProps(fields.email, { type: "email" })}
                            placeholder={t("signin.emailPlaceholder")}
                        />
                        <div id={fields.email.errorId} className="label">
                            {fields.email.errors}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="fieldset">
                        <label className="fieldset-legend inline-block" htmlFor={fields.password.id}>
                            <Trans i18nKey="signin.passwordLabel">
                                Password <span aria-hidden="true">*</span>
                            </Trans>
                        </label>
                        <input
                            className="input"
                            {...getInputProps(fields.password, { type: "password" })}
                            placeholder={t("signin.passwordPlaceholder")}
                        />
                        <div id={fields.password.errorId} className="label">
                            {fields.password.errors}
                        </div>
                    </div>

                    {/* submit button */}
                    <div className="mt-5 flex justify-end md:justify-start">
                        <Button type="submit" className="btn-primary mb-2">
                            <Trans i18nKey="signin.submitButton">Sign In</Trans>
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}
