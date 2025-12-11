import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Book } from "~/types";

import Genre from "./Genre";

type BookProps = {
    book: Book;
};

export default function Book({ book }: BookProps) {
    return (
        <div>
            <span>{book.title}</span>
        </div>
    );
}
