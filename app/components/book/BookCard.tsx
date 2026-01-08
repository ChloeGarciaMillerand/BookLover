import { Link, useFetcher } from "react-router";
import { Pen, Trash } from "lucide-react";

import type { Book, List } from "~/types";

import Genre from "../genre/Genre";

type BookProps = {
    book: Book;
    list: List;
};

export default function BookCard({ book, list }: BookProps) {
    let fetcher = useFetcher();

    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <h2 className="card-title">{book.title}</h2>

                    <div className="flex gap-2">
                        {/* EDIT BOOK */}
                        <Link to={`edit-book/${book.id}`} aria-label="Modifier le livre" className="hover:text-info">
                            <Pen size={18} aria-hidden="true" />
                        </Link>

                        {/* DELETE BOOK */}
                        <fetcher.Form
                            method="post"
                            action={`/list/${list.id}/delete-book/${book.id}`}
                            onSubmit={(e) => {
                                if (!confirm(`Supprimer le livre "${book.title}" ?`)) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button
                                type="submit"
                                className="cursor-pointer hover:text-error"
                                aria-label="supprimer le livre"
                            >
                                <Trash size={18} aria-hidden="true" />
                            </button>
                        </fetcher.Form>
                    </div>
                </div>

                {book.genre && <Genre book={book} />}

                {book.author && <span className="font-semibold">Auteur: {book.author}</span>}

                {book.editor && <span>Editeur: {book.editor}</span>}

                {book.library_code && <span>Cote bibliothèque: {book.library_code}</span>}

                {book.comment && <span>Commentaire: {book.comment}</span>}

                {book.ISBN && <span>ISBN: {book.ISBN}</span>}
            </div>
        </div>
    );
}
