import { useState } from "react";
import { Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import { Pen, Trash, EllipsisVertical } from "lucide-react";

import type { Book, List } from "~/types";

import Genre from "../genre/Genre";

type BookProps = {
    book: Book;
    list: List;
};

export default function BookCard({ book, list }: BookProps) {
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
                    <h2 className="card-title">{book.title}</h2>

                    <div className="dropdown dropdown-end">
                        <button
                            className="btn btn-neutral btn-sm btn-circle"
                            onClick={toggleMenu}
                            aria-expanded={isOpen}
                        >
                            <EllipsisVertical size={18} />
                            <span className="sr-only">
                                <Trans i18nKey="list.openMenu">Open menu</Trans>
                            </span>
                        </button>
                        {isOpen && (
                            <ul className="menu menu-base dropdown-content bg-base-100 rounded-box z-10 mt-2 w-40 p-2 shadow">
                                {/* EDIT BOOK */}
                                <li>
                                    <Link
                                        to={`edit-book/${book.id}`}
                                        aria-label={t("list.editBookButtonAria")}
                                        title={t("list.editBookButtonAria")}
                                        className="flex items-center gap-2 justify-end"
                                        onClick={closeMenu}
                                    >
                                        <Pen size={16} />
                                        <Trans i18nKey="home.editListButton">Edit</Trans>
                                    </Link>
                                </li>

                                {/* DELETE BOOK */}
                                <li>
                                    <button
                                        type="button"
                                        title={t("list.deleteBookButtonAria")}
                                        aria-label={t("list.deleteBookButtonAria")}
                                        className="cursor-pointer flex items-center gap-2 hover:text-error justify-end"
                                        onClick={() => {
                                            if (confirm(t("list.deleteBookConfirm", { name: book.title }))) {
                                                fetcher.submit(null, {
                                                    method: "post",
                                                    action: `/list/${list.id}/delete-book/${book.id}`,
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

                {book.genre && <Genre book={book} />}

                {book.author && (
                    <span className="font-semibold">
                        <Trans i18nKey="list.bookAuthor" values={{ author: book.author }}>
                            Author: {book.author}
                        </Trans>
                    </span>
                )}

                {book.editor && (
                    <span>
                        <Trans i18nKey="list.bookEditor" values={{ editor: book.editor }}>
                            Editor: {book.editor}
                        </Trans>
                    </span>
                )}

                {book.library_code && (
                    <span>
                        <Trans i18nKey="list.libraryCode" values={{ code: book.library_code }}>
                            Library code: {book.library_code}
                        </Trans>
                    </span>
                )}

                {book.comment && (
                    <span>
                        <Trans i18nKey="list.comment" values={{ comment: book.comment }}>
                            Comment: {book.comment}
                        </Trans>
                    </span>
                )}

                {book.ISBN && (
                    <span>
                        <Trans i18nKey="list.ISBN" values={{ ISBN: book.ISBN }}>
                            ISBN: {book.ISBN}
                        </Trans>
                    </span>
                )}
            </div>
        </div>
    );
}
