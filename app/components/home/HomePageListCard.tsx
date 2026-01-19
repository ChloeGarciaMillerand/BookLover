import { Link, useFetcher } from "react-router";

import { Pen, Trash } from "lucide-react";

import type { HomePageBook, HomePageList } from "~/types";

import Genre from "../genre/Genre";

type HomePageListCardProps = {
    list: HomePageList;
};

export default function HomePageListCard({ list }: HomePageListCardProps) {
    let fetcher = useFetcher();

    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <Link to={`list/${list.id}`}>
                        <h2 className="card-title hover:text-info">{list.name}</h2>
                    </Link>

                    <div className="flex gap-2">
                        {/* EDIT LIST */}
                        <Link to={`edit-list/${list.id}`} aria-label="Modifier la liste" className="hover:text-info">
                            <Pen size={18} aria-hidden="true" />
                        </Link>

                        {/* DELETE LIST */}
                        <fetcher.Form
                            method="post"
                            action={`/delete-list/${list.id}`}
                            onSubmit={(e) => {
                                if (!confirm(`Supprimer la liste "${list.name}" et les livres qu'elle contient?`)) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button
                                type="submit"
                                className="cursor-pointer hover:text-error"
                                aria-label="supprimer la liste"
                            >
                                <Trash size={18} aria-hidden="true" />
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

                <ul>
                    {/* BOOK INFO */}
                    {list.books?.map((book: HomePageBook) => (
                        <li key={book.id}>
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
