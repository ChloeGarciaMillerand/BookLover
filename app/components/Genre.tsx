import type { HomePageBook } from "~/types";

type GenreProps = {
    book: HomePageBook;
};

export default function Genre({ book }: GenreProps) {
    if (!book.genre) return null;

    return (
        <span className={`px-2 border rounded-md`} style={{ borderColor: book.genre.color }}>
            {book.genre.name}
        </span>
    );
}
