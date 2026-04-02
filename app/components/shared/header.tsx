import { NavLink, Form, Link, useFetcher } from "react-router";
import { useTranslation } from "react-i18next";

import logoLight from "~/assets/icons/logo-light.svg";
import logoDark from "~/assets/icons/logo-dark.svg";
import type { User } from "~/types";

type HeaderProps = {
    user: User | null;
};

export default function Header({ user }: HeaderProps) {
    const { i18n } = useTranslation();
    const fetcher = useFetcher();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);

        // Update the cookie on the server
        fetcher.submit(
            { lng },
            { method: "post", action: "/set-locale" }, // update this to your route that sets the locale cookie
        );
    };

    return (
        <header className="m-auto w-90/100 md:w-85/100 lg:w-75/100 ">
            <div className="navbar w-full bg-base-100">
                {/* logo */}
                <div className="navbar-start">
                    <a href="/" className="logo">
                        <img src={logoLight} alt="Logo BookLover" className="logo-light w-full" />
                        <img src={logoDark} alt="Logo Booklover" className="logo-dark w-full" />
                    </a>
                </div>

                {/* burger menu */}
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        {user ? (
                            <>
                                <button type="button" className="btn btn-ghost btn-circle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {" "}
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h7"
                                        />{" "}
                                    </svg>
                                </button>
                                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-right">
                                    <>
                                        <li className="text-right">
                                            <NavLink to="/" className="nav-links block truncate">
                                                Mes listes
                                            </NavLink>
                                        </li>
                                        <li className="text-right">
                                            <NavLink to="/genres" className="nav-links block truncate">
                                                Genres
                                            </NavLink>
                                        </li>
                                        <li>
                                            <Form method="post" action="/signout">
                                                <button
                                                    type="submit"
                                                    className="nav-links block truncate w-full text-right cursor-pointer"
                                                >
                                                    Se déconnecter
                                                </button>
                                            </Form>
                                        </li>
                                    </>
                                </ul>
                            </>
                        ) : (
                            <div className="hidden md:flex flex-row gap-4">
                                <Link to="/signin" className="btn btn-outline btn-secondary mt-5">
                                    Se connecter
                                </Link>
                                <Link to="/signup" className="btn btn-primary mt-5">
                                    Créer un compte
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Language selector */}
                    <select
                        value={i18n.language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="select select-secondary select-sm w-auto min-w-0 mt-5 ml-4"
                    >
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                    </select>
                </div>
            </div>
        </header>
    );
}
