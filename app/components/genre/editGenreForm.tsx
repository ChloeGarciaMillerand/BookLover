import { Form, Link, useActionData } from "react-router";
import type { TFunction } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import type { Genre } from "~/types";

import { Button } from "../shared/Button";

export const createSchema = (t: TFunction) =>
    z.object({
        name: z.string({ message: t("editGenre.nameErrorMessage") }).min(1),
        color: z.string({ message: t("editGenre.colorErrorMessage") }).min(1),
    });

type GenreProps = {
    genre: Genre;
};

export default function EditGenreForm({ genre }: GenreProps) {
    const lastResult = useActionData();
    //translation
    const { t } = useTranslation();
    const schema = createSchema(t);

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
                        <Trans i18nKey="editGenre.nameLabel">Name*</Trans>
                    </label>
                    <input className="input" {...getInputProps(fields.name, { type: "text" })} />
                    <div id={fields.name.errorId} className="label">
                        {fields.name.errors}
                    </div>
                </div>
                {/* Color */}
                <div className="fieldset">
                    <label className="fieldset-legend" htmlFor={fields.color.id}>
                        <Trans i18nKey="editGenre.colorLabel">Color*</Trans>
                    </label>
                    <input {...getInputProps(fields.color, { type: "color" })} />
                    <div id={fields.color.errorId} className="label">
                        {fields.color.errors}
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Link to={`/genres`}>
                    <Button className="btn-outline">
                        <Trans i18nKey="editGenre.cancelButton">Cancel</Trans>
                    </Button>
                </Link>
                <Button type="submit" className="btn-primary">
                    <Trans i18nKey="editGenre.submitButton">Update</Trans>
                </Button>
            </div>
        </Form>
    );
}
