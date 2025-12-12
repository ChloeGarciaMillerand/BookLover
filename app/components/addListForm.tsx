import { Form, useActionData } from "react-router";

export default function AddListForm() {
    const actionData = useActionData();

    return (
        // returns form-related errors (e.g. name list is required)
        <Form method="POST">
            {actionData?.errors.form ? (
                <p className="register-error-text" role="alert">
                    {actionData?.errors?.form}
                </p>
            ) : null}
            {/* form fields */}
            <div>
                <fieldset className="fieldset">
                    <label htmlFor="name">Titre*</label>
                    <legend className="fieldset-legend">Titre</legend>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="input"
                        placeholder="Nom de la liste"
                        aria-describedby={actionData?.errors?.name ? "name-error" : undefined}
                    />
                    {actionData?.errors?.name ? (
                        <p className="register-error-text" id="name-error">
                            {actionData?.errors?.name}
                        </p>
                    ) : null}
                </fieldset>
                {/* submit button */}
                <button type="submit" className="button-submission">
                    Créer une liste
                </button>
            </div>
        </Form>
    );
}
