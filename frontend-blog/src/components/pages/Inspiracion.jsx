import React from "react";
import { Sidebar } from "../pages/Sidebar";

import "../../styles/inspiracion.css";
import "../../styles/sidebar.css";

export const Inspiracion = () => {
    return (
        <>
            <h1 className="inspiracion-container">Sección de Inspiracion</h1>
            <div className="inspiracion-content">
                <div className="column-left">
                    <p>
                        Esta es la sección de Inspiracion. Aquí encontrarás
                        contenido relacionado con el inspiracion y la salud
                    </p>
                </div>
                <div className="column-right">
                    <Sidebar className="inspiracion-sidebar" />
                </div>
            </div>
        </>
    );
};
