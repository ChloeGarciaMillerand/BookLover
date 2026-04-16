import { Form, Link, useActionData } from "react-router";
import type { TFunction } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import type { List } from "~/types";

import { Button } from "../shared/Button";

type ListProps = {
    list: List;
};

export const createSchema = (t: TFunction) =>
    z.object({
        name: z.string({ message: t("editListForm.errorMessage") }).min(1, t("editListForm.errorMessage")),
    });

export default function EditListForm({ list }: ListProps) {
    //translation
    const { t } = useTranslation();
    const schema = createSchema(t);

    // validation data from last submit (server or client side)
    const lastResult = useActionData();

    // build HTML constraints from Zod schema
    const [form, fields] = useForm({
        lastResult,
        defaultValue: {
            name: list.name,
        },
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
        // returns form-related errors (e.g. name list is required)
        <Form method="POST" {...getFormProps(form)}>
            <div id={form.errorId}>{form.errors}</div>
            {/* form fields */}
            <div>
                <div className="fieldset">
                    <label className="fieldset-legend" htmlFor={fields.name.id}>
                        <Trans i18nKey="editListForm.nameLabel">List name</Trans>
                    </label>
                    <input className="input" {...getInputProps(fields.name, { type: "text" })} />
                    <div id={fields.name.errorId} className="label">
                        {fields.name.errors}
                    </div>
                </div>
                {/* submit and cancel buttons */}
                <div className="mt-5 flex justify-start gap-4">
                    <Button type="submit" className="btn-primary">
                        <Trans i18nKey="editListForm.submitButton">Update the list</Trans>
                    </Button>
                    <Link to="/">
                        <Button className="btn-outline btn-secondary">
                            <Trans i18nKey="editListForm.cancelButton">Cancel</Trans>
                        </Button>
                    </Link>
                </div>
            </div>
        </Form>
    );
}
