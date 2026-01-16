import { useState } from "react";
import { Form, useActionData } from "react-router";

import type { Book, Genre, List } from "~/types";

import { Button } from "../shared/Button";
import { AddGenreModal } from "~/routes/genre/addGenre";

type BookProps = {
    book: Book;
    genres: Genre[];
    lists: List[];
    currentListId: string | null;
};

export default function EditBookForm({ book, genres, lists, currentListId }: BookProps) {
    console.log("EditBookForm book:", book);
    const actionData = useActionData();

    // used to create new genres
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/*returns form-related errors (e.g. book name is required)*/}
            <Form method="POST">
                {actionData?.errors.form ? (
                    <p className="register-error-text" role="alert">
                        {actionData?.errors?.form}
                    </p>
                ) : null}
                {/* form fields */}
                <div>
                    {/* Title */}
                    <fieldset className="fieldset">
                        <label htmlFor="title">Titre*</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="input"
                            defaultValue={book.title}
                            aria-describedby={actionData?.errors?.title ? "title-error" : undefined}
                        />
                        {actionData?.errors?.title ? (
                            <p className="register-error-text" id="title-error">
                                {actionData?.errors?.title}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* Select list */}
                    <fieldset className="fieldset">
                        <label htmlFor="list_id">Liste</label>
                        <select id="list_id" name="list_id" defaultValue={currentListId ?? ""} className="select">
                            <option disabled={true}>Choisir une liste</option>
                            {lists.map((list: List) => (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                    </fieldset>

                    {/* Select genre */}
                    <fieldset className="fieldset">
                        <label htmlFor="genre">Genre</label>
                        <select id="genre" name="genre" defaultValue={book.genre?.id ?? ""} className="select">
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
                    </fieldset>

                    {/* Author */}
                    <fieldset className="fieldset">
                        <label htmlFor="author">Auteur</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            className="input"
                            defaultValue={book.author || ""}
                            placeholder="Nom de l'auteur"
                            aria-describedby={actionData?.errors?.author ? "author-error" : undefined}
                        />
                        {actionData?.errors?.author ? (
                            <p className="register-error-text" id="author-error">
                                {actionData?.errors?.author}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* Editor */}
                    <fieldset className="fieldset">
                        <label htmlFor="editor">Editeur</label>
                        <input
                            id="editor"
                            name="editor"
                            type="text"
                            className="input"
                            defaultValue={book.editor || ""}
                            placeholder="Nom de l'éditeur"
                            aria-describedby={actionData?.errors?.editor ? "editor-error" : undefined}
                        />
                        {actionData?.errors?.editor ? (
                            <p className="register-error-text" id="editor-error">
                                {actionData?.errors?.editor}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* Library code */}
                    <fieldset className="fieldset">
                        <label htmlFor="library_code">Cote bibliothèque</label>
                        <input
                            id="library_code"
                            name="library_code"
                            type="text"
                            className="input"
                            defaultValue={book.library_code || ""}
                            placeholder="Exemple: J BOS 38"
                            aria-describedby={actionData?.errors?.library_code ? "library_code-error" : undefined}
                        />
                        {actionData?.errors?.library_code ? (
                            <p className="register-error-text" id="library_code-error">
                                {actionData?.errors?.library_code}
                            </p>
                        ) : null}
                    </fieldset>

                    {/* Comment */}
                    <fieldset className="fieldset">
                        <label htmlFor="comment">Commentaire</label>
                        <textarea
                            id="comment"
                            name="comment"
                            className="input"
                            defaultValue={book.comment || ""}
                            placeholder="Ajouter un commentaire"
                        />
                    </fieldset>

                    {/* ISBN */}
                    <fieldset className="fieldset">
                        <label htmlFor="ISBN">ISBN</label>
                        <input
                            id="ISBN"
                            name="ISBN"
                            type="text"
                            className="input"
                            defaultValue={book.ISBN || ""}
                            placeholder="Exemple: 978-2-07-061275-8"
                            aria-describedby={actionData?.errors?.ISBN ? "ISBN-error" : undefined}
                        />
                        {actionData?.errors?.ISBN ? (
                            <p className="register-error-text" id="ISBN-error">
                                {actionData?.errors?.ISBN}
                            </p>
                        ) : null}
                    </fieldset>

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
