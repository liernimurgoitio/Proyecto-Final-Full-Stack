import React from "react";
import ArticlesForm from "./ArticlesForm";
import Comentarios from "./Comentarios";
import "../../styles/sidebar.css";

export const Sidebar = () => {
    return (
        <div className="sidebar-component">
            <div className="articles">
                <ArticlesForm />
            </div>
            <div className="comentarios">
                <Comentarios showButtons={false} />
            </div>
        </div>
    );
};

<Comentarios showButtons={false} />;
