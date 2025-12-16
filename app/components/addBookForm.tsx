import { Form, useActionData } from "react-router";

import { Button } from "./Button";

export default function AddBookForm() {
    const actionData = useActionData();

    return (
        // returns form-related errors (e.g. book name is required)

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
                        placeholder="Titre du livre"
                        aria-describedby={actionData?.errors?.title ? "title-error" : undefined}
                    />
                    {actionData?.errors?.title ? (
                        <p className="register-error-text" id="title-error">
                            {actionData?.errors?.title}
                        </p>
                    ) : null}
                </fieldset>

                {/* TODO: select genre */}

                {/* Author */}
                <fieldset className="fieldset">
                    <label htmlFor="author">Auteur</label>
                    <input
                        id="author"
                        name="author"
                        type="text"
                        className="input"
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
                        placeholder="Ajouter la cote de la bibliothèque"
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
                    <textarea id="comment" name="comment" className="input" placeholder="Ajouter un commentaire" />
                </fieldset>

                {/* ISBN */}
                <fieldset className="fieldset">
                    <label htmlFor="ISBN">ISBN</label>
                    <input
                        id="ISBN"
                        name="ISBN"
                        type="text"
                        className="input"
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
                        Ajouter un livre
                    </Button>
                </div>
            </div>
        </Form>
    );
}
