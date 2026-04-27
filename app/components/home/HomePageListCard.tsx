import { useState } from "react";
import { Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import { Pen, Trash, EllipsisVertical } from "lucide-react";

import type { HomePageBook, HomePageList } from "~/types";

import Genre from "../genre/Genre";

type HomePageListCardProps = {
    list: HomePageList;
};

export default function HomePageListCard({ list }: HomePageListCardProps) {
    const { t } = useTranslation();
    let fetcher = useFetcher();

    // Close the dropdown
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev: any) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <Link to={`list/${list.id}`}>
                        <h2 className="card-title hover:text-info">{list.name}</h2>
                    </Link>

                    <div className="dropdown dropdown-end">
                        <button className="btn btn-neutral btn-sm btn-circle" onClick={toggleMenu}>
                            <EllipsisVertical size={18} />
                            <span className="sr-only">
                                <Trans i18nKey="home.openMenu">Open menu</Trans>
                            </span>
                        </button>
                        {isOpen && (
                            <ul className="menu menu-base dropdown-content bg-base-100 rounded-box z-10 mt-2 w-40 p-2 shadow">
                                {/* EDIT LIST */}
                                <li>
                                    <Link
                                        to={`edit-list/${list.id}`}
                                        aria-label={t("home.editListButtonAria")}
                                        title={t("home.editListButtonAria")}
                                        className="flex items-center gap-2 justify-end"
                                        onClick={closeMenu}
                                    >
                                        <Pen size={16} />
                                        <Trans i18nKey="home.editListButton">Edit</Trans>
                                    </Link>
                                </li>

                                {/* DELETE LIST */}
                                <li>
                                    <button
                                        type="button"
                                        aria-label={t("home.deleteListButtonAria")}
                                        title={t("home.deleteListButtonAria")}
                                        className="cursor-pointer flex items-center gap-2 hover:text-error justify-end"
                                        onClick={() => {
                                            if (confirm(t("home.deleteListConfirm", { name: list.name }))) {
                                                fetcher.submit(null, {
                                                    method: "post",
                                                    action: `/delete-list/${list.id}`,
                                                });
                                            }
                                        }}
                                    >
                                        <Trash size={16} />
                                        <Trans i18nKey="home.deleteListButton">Delete</Trans>
                                    </button>
                                </li>
                            </ul>
                        )}
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
                            <span className="text-base font-bold">{book.title}</span>
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
