import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../App.css";
import bienestar from "../../images/bienestar.jpg";
import inspiracion from "../../images/inspiracion.jpg";
import estilodevida from "../../images/estilodevida.jpg";
import "../../styles/home.css";
import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Home = () => {
    useEffect(() => {
        const blinkCursors = document.querySelectorAll(".blink-cursor");

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            blinkCursors.forEach((cursor, index) => {
                if (currentIndex === index) {
                    cursor.classList.add("active");
                } else {
                    cursor.classList.remove("active");
                }
            });
            currentIndex = (currentIndex + 1) % blinkCursors.length;
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const categories = [
        { name: "Bienestar", image: bienestar, link: "/bienestar" },
        { name: "Inspiración", image: inspiracion, link: "/inspiracion" },
        { name: "Estilo de vida", image: estilodevida, link: "/estilovida" },
    ];

    const socialMediaLinks = [
        {
            url: "https://www.facebook.com/Mujer49plus",
            icon: faFacebook,
        },
        {
            url: "https://www.instagram.com/mujer49plus/",
            icon: faInstagram,
        },
    ];

    return (
        <div className="hero-home">
            <h1 className="hero-head">
                Bienvenid@ a Mujer 49 plus
                <span className="blink-cursor blink-cursor-1">_</span>
                <span className="blink-cursor blink-cursor-2">_</span>
                <span className="blink-cursor blink-cursor-3">_</span>
            </h1>

            <div className="hero-content">
                <p>
                    En este blog, encontrarás contenido inspirador y motivador
                    para mujeres en esta etapa de la vida. Explora nuestras
                    categorías:
                </p>
            </div>

            <div className="hero-links">
                {categories.map((category, index) => (
                    <NavLink
                        key={index}
                        to={category.link}
                        activeClassName="active-link"
                    >
                        <img src={category.image} alt={category.name} />
                        <span className="link-name">{category.name}</span>
                    </NavLink>
                ))}
            </div>

            <p>
                No te pierdas nuestras publicaciones más recientes y únete a
                nuestra comunidad de mujeres empoderadas.
            </p>

            <div className="social-media-links">
                {socialMediaLinks.map((link) => (
                    <Link
                        to={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={link.name}
                    >
                        <FontAwesomeIcon icon={link.icon} />
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
