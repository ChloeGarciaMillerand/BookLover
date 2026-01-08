import { Link } from "react-router";

import type { Route } from "./+types/landing";

export function meta(_args: Route.MetaArgs) {
    return [{ title: "BookLover" }, { name: "description", content: "BookLover, organisez vos lectures facilement!" }];
}

export default function landing() {
    return (
        <div className="mx-auto w-4/5 md:w-2/5 mt-[20vh]">
            <h1 className="h1">BookLover</h1>
            <p>L'application qui vous facilite la lecture!</p>
            <Link to="/signin" className="btn btn-primary">
                Se connecter / s'inscrire
            </Link>
        </div>
    );
}
