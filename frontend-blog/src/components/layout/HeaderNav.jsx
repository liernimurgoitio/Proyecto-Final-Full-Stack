import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "../../styles/header.css";

export const HeaderNav = () => {
    useEffect(() => {
        const button = document.querySelector(".button");
        const nav = document.querySelector(".nav");

        const handleClick = () => {
            nav.classList.toggle("active");
            button.classList.toggle("active");
        };

        button.addEventListener("click", handleClick);

        return () => {
            button.removeEventListener("click", handleClick);
        };
    }, []);

    const navLinks = [
        { to: "/home", name: "Home" },
        { to: "/bienestar", name: "Bienestar" },
        { to: "/inspiracion", name: "Inspiración" },
        { to: "/estilovida", name: "Estilo de vida" },
        { to: "/comentarios", name: "Comentarios" },
    ];

    return (
        <header className="header">
            <div className="logo">
                <div className="circle-logo">
                    <div className="letter-logo">LM</div>
                </div>
            </div>

            <button className="button">
                <svg
                    className="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                </svg>
            </button>

            <nav className="nav">
                <ul className="ul">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink to={link.to} activeclassname="active">
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};
