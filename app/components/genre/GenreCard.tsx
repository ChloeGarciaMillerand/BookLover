import { Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { Pen, Trash } from "lucide-react";

import type { Genre } from "~/types";

type GenreProps = {
    genre: Genre;
};

export default function GenreCard({ genre }: GenreProps) {
    const { t } = useTranslation();
    let fetcher = useFetcher();
    return (
        <div className="card bg-base-300 text-base-content w-x1 mx-auto my-5">
            <div className="card-body">
                <div className="flex flex-col sm:flex-row justify-between">
                    {/* GENRE */}
                    <span className="px-2 border rounded-md mr-auto" style={{ borderColor: genre.color }}>
                        {genre.name}
                    </span>

                    <div className="flex gap-4">
                        {/* EDIT GENRE */}
                        <Link
                            to={`edit-genre/${genre.id}`}
                            aria-label={t("genre.editGenreButtonAria")}
                            title={t("genre.editGenreButton")}
                            className="hover:text-info flex flex-row gap-1"
                        >
                            <Pen size={18} aria-hidden="true" />
                            <p>
                                <Trans i18nKey="genre.editGenreButton">Edit</Trans>
                            </p>
                        </Link>

                        {/* DELETE GENRE */}
                        <fetcher.Form
                            method="post"
                            action={`/delete-genre/${genre.id}`}
                            onSubmit={(e) => {
                                if (!confirm(t("genre.deleteGenreConfirm", { name: genre.name }))) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button
                                type="submit"
                                title={t("genre.deleteGenreButton")}
                                className="cursor-pointer hover:text-error flex flex-row gap-1"
                                aria-label={t("genre.deleteGenreButtonAria")}
                            >
                                <Trash size={18} aria-hidden="true" />
                                <p>
                                    <Trans i18nKey="genre.deleteGenreButton">Delete</Trans>
                                </p>
                            </button>
                        </fetcher.Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
