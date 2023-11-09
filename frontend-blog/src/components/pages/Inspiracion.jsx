import React, { useEffect, useState } from "react";
import { Sidebar } from "../pages/Sidebar";
import axios from "axios";
import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../../styles/inspiracion.css";
import "../../styles/sidebar.css";

export const Inspiracion = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/images"
            );
            console.log(response.data);
            setImages(response.data.imagenes);
        } catch (error) {
            console.error("Error al obtener las imágenes:", error);
        }
    };

    return (
        <>
            <h1 className="inspiracion-container">Sección de Inspiracion</h1>
            <div className="inspiracion-content">
                <div className="column-left">
                    <p>
                        Esta es la sección de Inspiracion. Aquí encontrarás
                        contenido relacionado con el inspiracion y la salud
                    </p>
                    {images.length > 0 ? (
                        <Carousel images={images} />
                    ) : (
                        <p>No se encontraron imágenes.</p>
                    )}
                </div>
                <div className="column-right">
                    <Sidebar className="inspiracion-sidebar" />
                </div>
            </div>
        </>
    );
};
