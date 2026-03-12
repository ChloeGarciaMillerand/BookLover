import { Form, Link, useActionData } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import type { Genre } from "~/types";

import { Button } from "../shared/Button";

export const schema = z.object({
    name: z.string({ message: "Le nom du genre est requis" }).min(1),
    color: z.string({ message: "La couleur est requise" }).min(1),
});

type GenreProps = {
    genre: Genre;
};

export default function EditGenreForm({ genre }: GenreProps) {
    const lastResult = useActionData();

    // build HTML constraints from Zod schema
    const [form, fields] = useForm({
        lastResult,
        defaultValue: {
            name: genre.name,
            color: genre.color,
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
        <Form method="POST" {...getFormProps(form)}>
            <div id={form.errorId}>{form.errors}</div>
            {/* form fields */}
            <div>
                {/* Name */}
                <div className="fieldset">
                    <label className="fieldset-legend" htmlFor={fields.name.id}>
                        Nom*
                    </label>
                    <input className="input" {...getInputProps(fields.name, { type: "text" })} />
                    <div id={fields.name.errorId} className="label">
                        {fields.name.errors}
                    </div>
                </div>
                {/* Color */}
                <div className="fieldset">
                    <label className="fieldset-legend" htmlFor={fields.color.id}>
                        Couleur*
                    </label>
                    <input {...getInputProps(fields.color, { type: "color" })} />
                    <div id={fields.color.errorId} className="label">
                        {fields.color.errors}
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Link to={`/genres`}>
                    <Button className="btn-outline">Annuler</Button>
                </Link>
                <Button type="submit" className="btn-primary">
                    Enregistrer
                </Button>
            </div>
        </Form>
    );
}
