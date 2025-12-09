import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta(_args: Route.MetaArgs) {
    return [
        { title: "BookLover" },
        { name: "description", content: "Bienvenue dans votre gestionnaire de listes de livres!" },
    ];
}

export default function Home() {
    return (
        <div>
            <h1>Hello!</h1>
        </div>
    );
}
