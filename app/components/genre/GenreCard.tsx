import { useState } from "react";
import { Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { Pen, Trash, EllipsisVertical } from "lucide-react";

import type { Genre } from "~/types";

type GenreProps = {
    genre: Genre;
};

export default function GenreCard({ genre }: GenreProps) {
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
                    {/* GENRE */}
                    <span
                        className="flex px-2 border rounded-md mr-auto items-center"
                        style={{ borderColor: genre.color }}
                    >
                        {genre.name}
                    </span>

                    <div className="dropdown dropdown-end">
                        <button className="btn btn-neutral btn-sm btn-circle" onClick={toggleMenu}>
                            <EllipsisVertical size={18} />
                            <span className="sr-only">
                                <Trans i18nKey="genre.openMenu">Open menu</Trans>
                            </span>
                        </button>
                        {isOpen && (
                            <ul className="menu menu-base dropdown-content bg-base-100 rounded-box z-10 mt-2 w-40 p-2 shadow">
                                <li>
                                    {/* EDIT GENRE */}
                                    <Link
                                        to={`edit-genre/${genre.id}`}
                                        aria-label={t("genre.editGenreButtonAria")}
                                        title={t("genre.editGenreButton")}
                                        className="flex w-full items-center gap-2 justify-end text-right"
                                        onClick={closeMenu}
                                    >
                                        <Pen size={18} aria-hidden="true" />
                                        <span>
                                            <Trans i18nKey="genre.editGenreButton">Edit</Trans>
                                        </span>
                                    </Link>
                                </li>

                                {/* DELETE GENRE */}
                                <li>
                                    <button
                                        type="button"
                                        title={t("genre.deleteGenreButton")}
                                        className="cursor-pointer flex items-center gap-2 hover:text-error justify-end"
                                        aria-label={t("genre.deleteGenreButtonAria")}
                                        onClick={() => {
                                            if (confirm(t("genre.deleteGenreConfirm", { name: genre.name }))) {
                                                fetcher.submit(
                                                    {},
                                                    { method: "post", action: `/delete-genre/${genre.id}` },
                                                );
                                            }
                                        }}
                                    >
                                        <Trash size={18} aria-hidden="true" />
                                        <span>
                                            <Trans i18nKey="genre.deleteGenreButton">Delete</Trans>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
