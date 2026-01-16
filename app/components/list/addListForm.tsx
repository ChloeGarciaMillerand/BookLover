import { Form, useActionData } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import { Button } from "../shared/Button";

export const schema = z.object({
    name: z.string({ message: "Le nom de la liste est requis" }).min(1, "Le nom de la liste est requis"),
});

export default function AddListForm() {
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
        // returns form-related errors (e.g. name list is required)
        <Form method="POST" {...getFormProps(form)}>
            <div id={form.errorId}>{form.errors}</div>
            {/* form fields */}
            <div>
                <div className="fieldset">
                    <label className="fieldset-legend" htmlFor={fields.name.id}>
                        Titre*
                    </label>
                    <input
                        className="input"
                        {...getInputProps(fields.name, { type: "text" })}
                        placeholder="Nom de la liste"
                    />
                    <div id={fields.name.errorId} className="label">
                        {fields.name.errors}
                    </div>
                </div>
                {/* submit button */}
                <div className="mt-5 flex justify-end md:justify-start">
                    <Button type="submit" className="btn-primary">
                        Créer une liste
                    </Button>
                </div>
            </div>
        </Form>
    );
}
