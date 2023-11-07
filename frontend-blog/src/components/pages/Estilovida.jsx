import React from "react";
import { Sidebar } from "../pages/Sidebar";

import "../../styles/estilovida.css";
import "../../styles/sidebar.css";

export const Estilovida = () => {
    return (
        <>
            <h1 className="estilovida-container">Sección de Estilovida</h1>
            <div className="estilovida-content">
                <div className="column-left">
                    <p>
                        Esta es la sección de Estilovida. Aquí encontrarás
                        contenido relacionado con el estilovida y la salud
                    </p>
                </div>
                <div className="column-right">
                    <Sidebar className="estilovida-sidebar" />
                </div>
            </div>
        </>
    );
};
