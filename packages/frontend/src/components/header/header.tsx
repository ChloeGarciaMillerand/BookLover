import { NavLink } from "react-router";
import { useState } from "react";

import logo from "@src/assets/icons/logo.svg";

export default function Header() {
    // useState to manage the display of the burger menu
    const [isOpen, setIsOpen] = useState(false);

    // change the display of the burger menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            {/* logo */}
            <a href="/" className="logo">
                <img src={logo} alt="Logo BookLover" />
            </a>

            {/* burger menu */}
            <nav className="burger-menu">
                <button className="burger" onClick={toggleMenu}>
                    {isOpen ? (
                        // cross icon
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <line x1="10" y1="10" x2="40" y2="40" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                            <line x1="40" y1="10" x2="10" y2="40" stroke="#000" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    ) : (
                        // menu burger icon
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <path d="M5 8A2 2 0 1 0 5 12L45 12A2 2 0 1 0 45 8L5 8zM5 23A2 2 0 1 0 5 27L45 27A2 2 0 1 0 45 23L5 23zM5 38A2 2 0 1 0 5 42L45 42A2 2 0 1 0 45 38L5 38z" />
                        </svg>
                    )}
                </button>

                {/* links are displayed on click on the burger menu */}
                {isOpen && (
                    <ul className="navbar">
                        <li>
                            <NavLink to="lists" className="nav-links">
                                Mes listes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="tags" className="nav-links">
                                Tags
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="account" className="nav-links">
                                Mon compte
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
