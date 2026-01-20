import { Form, Link, useActionData, useParams } from "react-router";
import { useState } from "react";
import { getFormProps, getInputProps, getSelectProps, getTextareaProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import * as z from "zod";

import type { Genre } from "~/types";

import { Button } from "../shared/Button";
import { AddGenreModal } from "~/routes/genre/addGenre";

type GenreProps = {
    genres: Genre[];
};

export const schema = z.object({
    title: z.string({ message: "Le nom du livre est requis" }).min(1),
    genre: z.optional(z.string()),
    author: z.optional(z.string()),
    editor: z.optional(z.string()),
    library_code: z.optional(z.string()),
    comment: z.optional(z.string()),
    ISBN: z.optional(z.string()),
});

export default function AddBookForm({ genres }: GenreProps) {
    const lastResult = useActionData();
    const { id } = useParams();

    // used to create new genres
    const [showModal, setShowModal] = useState(false);

    const [form, fields] = useForm({
        lastResult,
        defaultValue: {
            genre: "Choisir un genre",
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
                            Titre*
                        </label>
                        <input
                            className="input"
                            {...getInputProps(fields.title, { type: "text" })}
                            placeholder="Titre du livre"
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
                        <input
                            className="input"
                            {...getInputProps(fields.author, { type: "text" })}
                            placeholder="Nom de l'auteur"
                        />
                        <div id={fields.author.errorId} className="label">
                            {fields.author.errors}
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="fieldset">
                        <label className="fieldset" htmlFor={fields.editor.id}>
                            Editeur
                        </label>
                        <input
                            className="input"
                            {...getInputProps(fields.editor, { type: "text" })}
                            placeholder="Nom de l'éditeur"
                        />
                        <div id={fields.editor.errorId} className="label">
                            {fields.editor.errors}
                        </div>
                    </div>

                    {/* Library code */}
                    <div className="fieldset">
                        <label className="fieldset-legend" htmlFor={fields.library_code.id}>
                            Cote bibliothèque
                        </label>
                        <input
                            {...getInputProps(fields.library_code, { type: "text" })}
                            className="input"
                            placeholder="Exemple: J BOS 38"
                        />
                        <div id={fields.library_code.errorId} className="label">
                            {fields.library_code.errors}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="fieldset">
                        <label className="fieldset" htmlFor={fields.comment.id}>
                            Commentaire
                        </label>
                        <textarea
                            {...getTextareaProps(fields.comment)}
                            className="input"
                            placeholder="Ajouter un commentaire"
                        />
                    </div>

                    {/* ISBN */}
                    <div className="fieldset">
                        <label className="fieldset" htmlFor={fields.ISBN.id}>
                            ISBN
                        </label>
                        <input
                            {...getInputProps(fields.ISBN, { type: "text" })}
                            className="input"
                            placeholder="Exemple: 978-2-07-061275-8"
                        />
                        <div id={fields.ISBN.errorId} className="label">
                            {fields.ISBN.errors}
                        </div>
                    </div>

                    {/* submit and cancel buttons */}
                    <div className="mt-5 flex flex-row justify-start gap-4">
                        <Button type="submit" className="btn-primary">
                            Ajouter un livre
                        </Button>

                        <Link to={`/list/${id}`}>
                            <Button className="btn-outline btn-secondary">Annuler</Button>
                        </Link>
                    </div>
                </div>
            </Form>
            {showModal && <AddGenreModal onClose={() => setShowModal(false)} />}
        </>
    );
}
