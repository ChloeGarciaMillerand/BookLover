import { Form, useActionData } from "react-router";

import type { List } from "~/types";

import { Button } from "./Button";

type ListProps = {
    list: List;
};

export default function EditListForm({ list }: ListProps) {
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
                    {/*<legend className="fieldset-legend">Titre</legend>*/}
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="input"
                        defaultValue={list.name}
                        aria-describedby={actionData?.errors?.name ? "name-error" : undefined}
                    />
                    {actionData?.errors?.name ? (
                        <p className="register-error-text" id="name-error">
                            {actionData?.errors?.name}
                        </p>
                    ) : null}
                </fieldset>
                {/* submit button */}
                <div className="mt-5 flex justify-end md:justify-start">
                    <Button type="submit" className="btn-primary">
                        Modifier la liste
                    </Button>
                </div>
            </div>
        </Form>
    );
}
