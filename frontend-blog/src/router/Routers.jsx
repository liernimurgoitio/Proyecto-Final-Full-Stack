import React from "react";

import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Comentarios from "../components/pages/Comentarios";
import ArticlesForm from "../components/pages/ArticlesForm";
import { Home } from "../components/pages/Home";
import { HeaderNav } from "../components/layout/HeaderNav";
import { Footer } from "../components/layout/Footer";
import { Bienestar } from "../components/pages/Bienestar";
import { Inspiracion } from "../components/pages/Inspiracion";
import { Estilovida } from "../components/pages/Estilovida";

export const Routers = () => {
    return (
        <BrowserRouter>
            {/* Header and Nav */}
            <HeaderNav />

            {/* Body = donde se cargan todos los componentes, por lo que definimos cada una de las rutas*/}
            <section className="content">
                <Routes>
                    <Route path="/comentarios" element={<Comentarios />} />
                    <Route path="/articles/new" element={<ArticlesForm />} />  
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/bienestar" element={<Bienestar />} />
                    <Route path="/inspiracion" element={<Inspiracion />} />
                    <Route path="/estilovida" element={<Estilovida />} />

                    <Route
                        path="*"
                        element={
                            <div className="page">
                                <h1 className="error">Error 404</h1>
                            </div>
                        }
                    />
                </Routes>
            </section>
            {/* Footer */}
            <Footer />
        </BrowserRouter>
    );
};
