import { useState } from "react";
import { Form, Link, useActionData, useParams } from "react-router";
import type { TFunction } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { getFormProps, getInputProps, getSelectProps, getTextareaProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import type { Genre } from "~/types";

import { Button } from "../shared/Button";
import { AddGenreModal } from "~/routes/genre/addGenre";

type GenreProps = {
    genres: Genre[];
};

export const createSchema = (t: TFunction) =>
    z.object({
        title: z.string({ message: t("addBookForm.titleErrorMessage") }).min(1),
        genre: z.optional(z.string()),
        author: z.optional(z.string()),
        editor: z.optional(z.string()),
        library_code: z.optional(z.string()),
        comment: z.optional(z.string()),
        ISBN: z.optional(z.string()),
    });

export default function AddBookForm({ genres }: GenreProps) {
    const { t } = useTranslation();
    const schema = createSchema(t);

    const lastResult = useActionData();
    const { id } = useParams();

    // used to create new genres
    const [showModal, setShowModal] = useState(false);

    const [form, fields] = useForm({
        lastResult,
        defaultValue: {
            genre: t("addBookForm.defaultGenreOption"),
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
        <>
            {/*returns form-related errors (e.g. book name is required)*/}
            <Form method="POST" {...getFormProps(form)} className="mb-5">
                <div id={form.errorId}>{form.errors}</div>
                {/* form fields */}
                <div>
                    {/* Title */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.title.id}>
                            <Trans i18nKey="addBookForm.titleLabel">Title</Trans>
                        </label>
                        <input
                            className="input"
                            {...getInputProps(fields.title, { type: "text" })}
                            placeholder={t("addBookForm.titlePlaceholder")}
                        />
                        <div id={fields.title.errorId} className="label">
                            {fields.title.errors}
                        </div>
                    </div>

                    {/* Select genre */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.genre.id}>
                            Genre
                        </label>
                        <select className="select" {...getSelectProps(fields.genre)}>
                            <option disabled={true}>{t("addBookForm.defaultGenreOption")}</option>
                            {genres.map((genre) =>
                                genre ? (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ) : null,
                            )}
                        </select>

                        {/* Add a genre */}
                        <div className="mt-1 flex justify-start">
                            <Button type="button" className="btn-secondary" onClick={() => setShowModal(true)}>
                                {t("addBookForm.addGenreButton")}
                            </Button>
                        </div>
                    </div>

                    {/* Author */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.author.id}>
                            <Trans i18nKey="addBookForm.authorLabel">Author</Trans>
                        </label>
                        <input
                            className="input"
                            {...getInputProps(fields.author, { type: "text" })}
                            placeholder={t("addBookForm.authorPlaceholder")}
                        />
                        <div id={fields.author.errorId} className="label">
                            {fields.author.errors}
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="fieldset">
                        <label className="fieldset" htmlFor={fields.editor.id}>
                            <Trans i18nKey="addBookForm.editorLabel">Editor</Trans>
                        </label>
                        <input
                            className="input"
                            {...getInputProps(fields.editor, { type: "text" })}
                            placeholder={t("addBookForm.editorPlaceholder")}
                        />
                        <div id={fields.editor.errorId} className="label">
                            {fields.editor.errors}
                        </div>
                    </div>

                    {/* Library code */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.library_code.id}>
                            <Trans i18nKey="addBookForm.libraryCodeLabel">Library code</Trans>
                        </label>
                        <input
                            {...getInputProps(fields.library_code, { type: "text" })}
                            className="input"
                            placeholder={t("addBookForm.libraryCodePlaceholder")}
                        />
                        <div id={fields.library_code.errorId} className="label">
                            {fields.library_code.errors}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.comment.id}>
                            <Trans i18nKey="addBookForm.commentLabel">Comment</Trans>
                        </label>
                        <textarea
                            {...getTextareaProps(fields.comment)}
                            className="input"
                            placeholder={t("addBookForm.commentPlaceholder")}
                        />
                    </div>

                    {/* ISBN */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.ISBN.id}>
                            <Trans i18nKey="addBookForm.ISBNLabel">ISBN</Trans>
                        </label>
                        <input
                            {...getInputProps(fields.ISBN, { type: "text" })}
                            className="input"
                            placeholder={t("addBookForm.ISBNPlaceholder")}
                        />
                        <div id={fields.ISBN.errorId} className="label">
                            {fields.ISBN.errors}
                        </div>
                    </div>

                    {/* submit and cancel buttons */}
                    <div className="mt-5 flex flex-row justify-start gap-4">
                        <Button type="submit" className="btn-primary">
                            <Trans i18nKey="addBookForm.submitButton">Add Book</Trans>
                        </Button>

                        <Link to={`/list/${id}`}>
                            <Button className="btn-outline btn-secondary">
                                <Trans i18nKey="addBookForm.cancelButton">Cancel</Trans>
                            </Button>
                        </Link>
                    </div>
                </div>
            </Form>
            {showModal && <AddGenreModal onClose={() => setShowModal(false)} />}
        </>
    );
}
