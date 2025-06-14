import { NavLink } from "react-router";

import logo from "@src/assets/icons/logo.svg";

export default function Header() {
    return (
        <header>
            <div className="navbar w-full bg-base-100 shadow-sm">
                {/* burger menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-right">
                            <li className="text-right">
                                <NavLink to="lists" className="nav-links block truncate">
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
                        </ul>
                    </div>
                </div>

                {/* logo */}
                <div className="navbar-end">
                    <a href="/" className="logo">
                        <img src={logo} alt="Logo BookLover" />
                    </a>
                </div>
            </div>
        </header>
    );
}
