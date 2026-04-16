import { localeCookie } from "~/middlewares/i18next";
import { data } from "react-router";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const lng = formData.get("lng")?.toString() ?? "en";

    return data(null, {
        headers: {
            "Set-Cookie": await localeCookie.serialize(lng),
        },
    });
}
