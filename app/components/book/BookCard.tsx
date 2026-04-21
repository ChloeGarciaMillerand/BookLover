import { Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import { Pen, Trash } from "lucide-react";

import type { Book, List } from "~/types";

import Genre from "../genre/Genre";

type BookProps = {
    book: Book;
    list: List;
};

export default function BookCard({ book, list }: BookProps) {
    const { t } = useTranslation();
    let fetcher = useFetcher();

    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-col sm:flex-row justify-between">
                    <h2 className="card-title">{book.title}</h2>

                    <div className="flex gap-4 my-2 md:my-0">
                        {/* EDIT BOOK */}
                        <Link
                            to={`edit-book/${book.id}`}
                            aria-label={t("list.editBookButtonAria")}
                            title={t("list.editBookButtonAria")}
                            className="btn btn-sm btn-outline btn-secondary flex items-center gap-2"
                        >
                            <Pen size={18} aria-hidden="true" />
                            <p>
                                <Trans i18nKey="list.editBookButton">Edit</Trans>
                            </p>
                        </Link>

                        {/* DELETE BOOK */}
                        <fetcher.Form
                            method="post"
                            action={`/list/${list.id}/delete-book/${book.id}`}
                            onSubmit={(e) => {
                                if (!confirm(t("list.deleteBookConfirm", { name: book.title }))) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button
                                type="submit"
                                title={t("list.deleteBookButtonAria")}
                                className="btn btn-sm btn-outline btn-accent flex items-center gap-2"
                                aria-label={t("list.deleteBookButtonAria")}
                            >
                                <Trash size={18} aria-hidden="true" />
                                <p>
                                    <Trans i18nKey="list.deleteBookButton">Delete</Trans>
                                </p>
                            </button>
                        </fetcher.Form>
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
