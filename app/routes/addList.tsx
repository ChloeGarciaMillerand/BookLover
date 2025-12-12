import { data } from "react-router";
import type { Route } from "./+types/addList";

type Errors = {
    list_name?: string;
};

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const list_name = String(formData.get("name"));

    const listData = { list_name };

    // error handling
    const errors: Errors = {};

    if (!list_name) {
        errors.list_name = "Nom de la liste obligatoire";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    // list registration in database
}

export default function addList() {
    return (
        <div>
            <h1>Créer une liste</h1>
        </div>
    );
}
