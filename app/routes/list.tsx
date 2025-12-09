import type { Route } from "./+types/list";

export const loader = (args: Route.LoaderArgs) => {
    // Analyse de l'URL
    const list_id = args.params.id;
};

export default function ListPage() {}
