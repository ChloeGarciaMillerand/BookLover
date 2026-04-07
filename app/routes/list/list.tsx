import { Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { Pen, Trash } from "lucide-react";

import { getSupabase } from "~/db/client";
import type { Route } from "./+types/list";

import { getOneListWithGenres } from "~/db/list";

import BookCard from "~/components/book/BookCard";
import { Button } from "~/components/shared/Button";

import { authMiddleware } from "~/middlewares/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ params, request }: Route.LoaderArgs) {
    const { supabase } = getSupabase(request);

    const listId = params.id;

    if (!listId) {
        throw new Response("Missing list id", { status: 400 });
    }

    const list = await getOneListWithGenres(supabase, { listId });

    return list;
}

export default function ListPage(props: Route.ComponentProps) {
    const { list } = props.loaderData;
    const { t } = useTranslation();
    let fetcher = useFetcher();

    //message if no book exists
    let emptyMessage = null;

    if (list.booklist.length === 0) {
        emptyMessage = (
            <p>
                <Trans i18nKey="list.emptyMessage">
                    This list has no books yet. <br /> Start by adding one.
                </Trans>
            </p>
        );
    }

    return (
        <div className="m-auto w-4/5 mt-4 mb-5 md:w-3/5">
            {/* Meta*/}
            <title>{t("meta.list.title")}</title>
            <meta name="description" content={t("meta.list.description")} />
            <meta property="og:title" content={t("meta.list.title")} />
            <meta property="og:description" content={t("meta.list.description")} />

            {/* Content */}
            <div className="mb-5 ">
                <Link to="/">
                    <p className="hover:underline">
                        {"<"} <Trans i18nKey="list.returnLink">Back to lists</Trans>
                    </p>
                </Link>
            </div>

            <div className="flex flex-col items-baseline md:flex-row md:gap-4">
                <h1 className="h1">{list.name}</h1>

                {/* MANAGE LIST*/}
                <div className="flex gap-4 mb-5">
                    {/* EDIT LIST */}
                    <Link
                        to={`/edit-list/${list.id}`}
                        aria-label={t("list.editListAria")}
                        title={t("list.editListAria")}
                        className="hover:text-info flex flex-row gap-1"
                    >
                        <Pen size={18} aria-hidden="true" />
                        <p>
                            <Trans i18nKey="list.editList">Edit</Trans>
                        </p>
                    </Link>

                    {/* DELETE LIST */}
                    <fetcher.Form
                        method="post"
                        action={`/delete-list/${list.id}`}
                        onSubmit={(e) => {
                            if (!confirm(t("list.deleteListConfirm", { name: list.name }))) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button
                            type="submit"
                            title={t("list.deleteListAria")}
                            className="cursor-pointer hover:text-error flex flex-row gap-1"
                            aria-label={t("list.deleteListAria")}
                        >
                            <Trash size={18} aria-hidden="true" />
                            <p>
                                <Trans i18nKey="list.deleteList">Delete</Trans>
                            </p>
                        </button>
                    </fetcher.Form>
                </div>
            </div>

            {/* LINE */}
            <div className="w-10 border-b-8 border-primary rounded-md"></div>

            <div className="my-5">{emptyMessage}</div>

            {/* BOOKS LIST*/}
            <ul>
                {list.booklist.map(({ book }) =>
                    book ? (
                        <li key={book.id}>
                            <BookCard book={book} list={list} />
                        </li>
                    ) : null,
                )}
            </ul>

            <div className="flex justify-end">
                <Link to={`/list/${list.id}/add-book`}>
                    <Button className="btn-primary">
                        <Trans i18nKey="list.addBookButton">Add a book</Trans>
                    </Button>
                </Link>
            </div>
        </div>
    );
}
