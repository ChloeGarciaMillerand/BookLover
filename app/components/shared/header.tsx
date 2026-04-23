import { useState } from "react";
import { NavLink, Link, useFetcher } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import logoLight from "~/assets/icons/logo-light.svg";
import logoDark from "~/assets/icons/logo-dark.svg";
import type { User } from "~/types";

type HeaderProps = {
    user: User | null;
};

export default function Header({ user }: HeaderProps) {
    // Language selector
    const { i18n } = useTranslation();
    const langFetcher = useFetcher();

    const currentLang = i18n.language?.split("-")[0] || "en";

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);

        // Update the cookie on the server
        langFetcher.submit(
            { lng },
            { method: "post", action: "/set-locale" }, // update this to your route that sets the locale cookie
        );
    };

    // Logout
    const logoutFetcher = useFetcher();

    // Close the dropdown
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev: any) => !prev);
    const closeMenu = () => setIsOpen(false);

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
                                <button type="button" className="btn btn-ghost btn-circle" onClick={toggleMenu}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
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

                                {isOpen && (
                                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/"
                                                    className="nav-links block truncate text-right text-sm"
                                                    onClick={closeMenu}
                                                >
                                                    <Trans i18nKey="header.listsLink">My Lists</Trans>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/genres"
                                                    className="nav-links block truncate text-right text-sm"
                                                    onClick={closeMenu}
                                                >
                                                    <Trans i18nKey="header.genresLink">Genres</Trans>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        logoutFetcher.submit(null, {
                                                            method: "post",
                                                            action: "/signout",
                                                        })
                                                    }
                                                    className="nav-links block truncate w-full text-right cursor-pointer text-sm"
                                                >
                                                    <Trans i18nKey="header.logoutButton">Logout</Trans>
                                                </button>
                                            </li>
                                        </>
                                    </ul>
                                )}
                            </>
                        ) : (
                            <div className="hidden md:flex flex-row gap-4">
                                <Link to="/signin" className="btn btn-outline btn-secondary">
                                    <Trans i18nKey="buttons.signinButton">Sign In</Trans>
                                </Link>
                                <Link to="/signup" className="btn btn-primary">
                                    <Trans i18nKey="buttons.signupButton">Sign Up</Trans>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Language selector */}
                    <select
                        value={currentLang}
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="select select-default w-auto min-w-0 ml-4"
                    >
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                    </select>
                </div>
            </div>
        </header>
    );
}
