import React from "react";
import { Sidebar } from "../pages/Sidebar";

import "../../styles/bienestar.css";
import "../../styles/sidebar.css";

export const Bienestar = () => {
    return (
        <>
            <h1 className="bienestar-container">Sección de Bienestar</h1>
            <div className="bienestar-content">
                <div className="column-left">
                    <p>
                        Esta es la sección de Bienestar. Aquí encontrarás
                        contenido relacionado con el bienestar y la salud
                    </p>
                </div>
                <div className="column-right">
                    <Sidebar className="bienestar-sidebar" />
                </div>
            </div>
        </>
    );
};
