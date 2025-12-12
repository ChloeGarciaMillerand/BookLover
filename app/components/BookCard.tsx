import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Book } from "~/types";

import Genre from "./Genre";

type BookProps = {
    book: Book;
};

export default function BookCard({ book }: BookProps) {
    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <h2 className="card-title">{book.title}</h2>

                    <div className="flex gap-2">
                        <button type="button">
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
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
