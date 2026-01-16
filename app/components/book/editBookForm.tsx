import { useState } from "react";
import { Form, useActionData } from "react-router";
import { getFormProps, getInputProps, getSelectProps, getTextareaProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import type { Book, Genre, List } from "~/types";

import { Button } from "../shared/Button";
import { AddGenreModal } from "~/routes/genre/addGenre";

type BookProps = {
    book: Book;
    genres: Genre[];
    lists: List[];
    currentListId: string | null;
};

export const schema = z.object({
    title: z.string({ message: "Le nom du livre est requis" }).min(1),
    list_id: z.string({ message: "Veuillez sélectionner une liste" }),
    genre_id: z.optional(z.string()),
    author: z.optional(z.string()),
    editor: z.optional(z.string()),
    library_code: z.optional(z.string()),
    comment: z.optional(z.string()),
    ISBN: z.optional(z.string()),
});

export default function EditBookForm({ book, genres, lists, currentListId }: BookProps) {
    const lastResult = useActionData();

    // build HTML constraints from Zod schema
    const [form, fields] = useForm({
        lastResult,
        defaultValue: {
            title: book.title,
            list_id: currentListId ?? "",
            genre_id: book.genre?.id ?? "",
            author: book.author || "",
            editor: book.editor || "",
            library_code: book.library_code || "",
            comment: book.comment || "",
            ISBN: book.ISBN || "",
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

    // used to create new genres
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/*returns form-related errors (e.g. book name is required)*/}
            <Form method="POST" {...getFormProps(form)}>
                <div id={form.errorId}>{form.errors}</div>
                {/* form fields */}
                <div>
                    {/* Title */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.title.id}>
                            Titre*
                        </label>
                        <input className="input" {...getInputProps(fields.title, { type: "text" })} />
                        <div id={fields.title.errorId} className="label">
                            {fields.title.errors}
                        </div>
                    </div>

                    {/* Select list */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.list_id.id}>
                            Liste
                        </label>
                        <select className="select" {...getSelectProps(fields.list_id)}>
                            <option disabled={true}>Choisir une liste</option>
                            {lists.map((list: List) => (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select genre */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.genre_id.id}>
                            Genre
                        </label>
                        <select className="select" {...getSelectProps(fields.genre_id)}>
                            <option disabled={true}>Choisir un genre</option>
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
                                Ajouter un genre
                            </Button>
                        </div>
                    </div>

                    {/* Author */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.author.id}>
                            Auteur
                        </label>
                        <input className="input" {...getInputProps(fields.author, { type: "text" })} />
                        <div id={fields.author.errorId} className="label">
                            {fields.author.errors}
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="fieldset">
                        <label className="fieldset" htmlFor={fields.editor.id}>
                            Editeur
                        </label>
                        <input className="input" {...getInputProps(fields.editor, { type: "text" })} />
                        <div id={fields.editor.errorId} className="label">
                            {fields.editor.errors}
                        </div>
                    </div>

                    {/* Library code */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.library_code.id}>
                            Cote bibliothèque
                        </label>
                        <input className="input" {...getInputProps(fields.library_code, { type: "text" })} />
                        <div id={fields.library_code.errorId} className="label">
                            {fields.library_code.errors}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="fieldset">
                        <label className="fieldset" htmlFor={fields.comment.id}>
                            Commentaire
                        </label>
                        <textarea className="input" {...getTextareaProps(fields.comment)} />
                    </div>

                    {/* ISBN */}
                    <div className="fieldset">
                        <label className="fieldset" htmlFor={fields.ISBN.id}>
                            ISBN
                        </label>
                        <input className="input" {...getInputProps(fields.ISBN, { type: "text" })} />
                        <div id={fields.ISBN.errorId} className="label">
                            {fields.ISBN.errors}
                        </div>
                    </div>

                    {/* submit button */}
                    <div className="mt-5 flex justify-end md:justify-start">
                        <Button type="submit" className="btn-primary">
                            Modifier le livre
                        </Button>
                    </div>
                </div>
            </Form>
            {showModal && <AddGenreModal onClose={() => setShowModal(false)} />}
        </>
    );
}
