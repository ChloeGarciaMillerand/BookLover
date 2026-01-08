import { NavLink, Form } from "react-router";

import logoLight from "~/assets/icons/logo-light.svg";
import logoDark from "~/assets/icons/logo-dark.svg";
import type { User } from "~/types";

type HeaderProps = {
    user: User | null;
};

export default function Header({ user }: HeaderProps) {
    return (
        <header>
            <div className="navbar w-full bg-base-100 shadow-sm">
                {/* logo */}
                <div className="navbar-start">
                    <a href="/" className="logo">
                        <img src={logoLight} alt="Logo BookLover" className="block w-full dark:hidden" />
                        <img src={logoDark} alt="Logo Booklover" className="hidden w-full dark:block" />
                    </a>
                </div>

                {/* burger menu */}
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
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
                            <li className="text-right">
                                <NavLink to="/" className="nav-links block truncate">
                                    Mes listes
                                </NavLink>
                            </li>
                            <li className="text-right">
                                <NavLink to="tags" className="nav-links block truncate">
                                    Tags
                                </NavLink>
                            </li>
                            <li className="text-right">
                                <NavLink to="account" className="nav-links block truncate">
                                    Mon compte
                                </NavLink>
                            </li>
                            {user && (
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
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
