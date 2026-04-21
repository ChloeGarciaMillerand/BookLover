import { Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import { Pen, Trash } from "lucide-react";

import type { HomePageBook, HomePageList } from "~/types";

import Genre from "../genre/Genre";

type HomePageListCardProps = {
    list: HomePageList;
};

export default function HomePageListCard({ list }: HomePageListCardProps) {
    const { t } = useTranslation();
    let fetcher = useFetcher();

    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-col sm:flex-row justify-between">
                    <Link to={`list/${list.id}`}>
                        <h2 className="card-title hover:text-info">{list.name}</h2>
                    </Link>

                    <div className="flex gap-4 my-2 md:my-0">
                        {/* EDIT LIST */}
                        <Link
                            to={`edit-list/${list.id}`}
                            aria-label={t("home.editListButtonAria")}
                            title={t("home.editListButtonAria")}
                            className="btn btn-sm btn-outline btn-secondary flex items-center gap-2"
                        >
                            <Pen size={18} aria-hidden="true" />
                            <p>
                                <Trans i18nKey="home.editListButton">Edit</Trans>
                            </p>
                        </Link>

                        {/* DELETE LIST */}
                        <fetcher.Form
                            method="post"
                            action={`/delete-list/${list.id}`}
                            onSubmit={(e) => {
                                if (!confirm(t("home.deleteListConfirm", { name: list.name }))) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button
                                type="submit"
                                title={t("home.deleteListButtonAria")}
                                className="btn btn-sm btn-outline btn-accent flex items-center gap-2"
                                aria-label={t("home.deleteListButtonAria")}
                            >
                                <Trash size={18} aria-hidden="true" />
                                <p>
                                    <Trans i18nKey="home.deleteListButton">Delete</Trans>
                                </p>
                            </button>
                        </fetcher.Form>
                    </div>
                </div>

                {/* TODO: add after creating tags
                <ul className="flex gap-2">
                    {list.tags?.map((tag) => (
                        <li key={tag.name}>
                            <button type="button" className={`btn ${tagColors[tag.color]}`}>
                                {tag.name}
                            </button>
                        </li>
                    ))}
                </ul>
                */}

                {/* LINE */}
                <div className="w-10 border-b-5 border-primary rounded-md"></div>

                <ul>
                    {/* BOOK INFO */}
                    {list.books?.map((book: HomePageBook) => (
                        <li key={book.id} className="my-2">
                            <span className="font-semibold">{book.title}</span>
                            {book.genre && (
                                <span>
                                    <span> - </span>
                                    <Genre book={book} />
                                </span>
                            )}
                            {book.author && <span> - {book.author}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
