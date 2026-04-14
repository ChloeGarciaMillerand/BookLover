import { Form, useActionData } from "react-router";
import type { TFunction } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import { Button } from "../shared/Button";

export const createSchema = (t: TFunction) =>
    z
        .object({
            email: z.string({ message: t("signup.emailRequired") }).email({ message: t("signup.emailInvalid") }),
            password: z
                .string({ message: t("signup.passwordRequired") })
                .min(6, { message: t("signup.passwordMinLength") }),
            confirmPassword: z.string({ message: t("signup.confirmPasswordRequired") }).min(1),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("signup.confirmPasswordMatch"),
        });

export default function SignupForm() {
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
                <div className="text-error" id={form.errorId}>
                    {form.errors}
                </div>
                {/* form fields */}
                <div>
                    {/* Email */}
                    <div className="fieldset">
                        <label className="fieldset-legend inline-block" htmlFor={fields.email.id}>
                            <Trans i18nKey="signup.emailLabel">
                                Email <span aria-hidden="true">*</span>
                            </Trans>
                        </label>
                        <input
                            className="input w-full"
                            {...getInputProps(fields.email, { type: "email" })}
                            placeholder={t("signup.emailPlaceholder")}
                        />
                        <div id={fields.email.errorId} className="label text-error">
                            {fields.email.errors}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="fieldset">
                        <label className="fieldset-legend inline-block" htmlFor={fields.password.id}>
                            <Trans i18nKey="signup.passwordLabel">
                                Password <span aria-hidden="true">*</span>
                            </Trans>
                        </label>

                        <input
                            className="input w-full"
                            {...getInputProps(fields.password, { type: "password" })}
                            placeholder={t("signup.passwordPlaceholder")}
                            aria-describedby={fields.password.errorId}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            <Trans i18nKey="signup.passwordMinLength">Password must be at least 6 characters</Trans>
                        </p>
                        <div id={fields.password.errorId} className="label text-error">
                            {fields.password.errors}
                        </div>
                    </div>

                    {/* Confirm password */}
                    <div className="fieldset">
                        <label className="fieldset-legend inline-block" htmlFor={fields.confirmPassword.id}>
                            <Trans i18nKey="signup.confirmPasswordLabel">
                                Confirm Password <span aria-hidden="true">*</span>
                            </Trans>
                        </label>
                        <input
                            className="input w-full"
                            {...getInputProps(fields.confirmPassword, { type: "password" })}
                            placeholder={t("signup.confirmPasswordPlaceholder")}
                            aria-describedby={fields.confirmPassword.errorId}
                        />
                        <div id={fields.confirmPassword.errorId} className="label text-error">
                            {fields.confirmPassword.errors}
                        </div>
                    </div>

                    {/* submit button */}
                    <div className="mt-5">
                        <Button type="submit" className="btn-primary">
                            <Trans i18nKey="signup.submitButton">Create an account</Trans>
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
}
