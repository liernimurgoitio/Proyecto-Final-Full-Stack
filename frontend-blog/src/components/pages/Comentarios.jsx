import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../../styles/comentarios.css";

function Comentarios({ showButtons }) {
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/articles");
            const sortedArticles = res.data.sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
            setArticles(sortedArticles);
        } catch (error) {
            console.error("Error al obtener los artículos:", error);
        }
    };

    const handleDelete = async (articleId) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/articles/${articleId}`
            );
            const updatedArticles = articles.filter(
                (article) => article._id !== articleId
            );
            setArticles(updatedArticles);
        } catch (error) {
            console.error("Error al eliminar el artículo:", error);
        }
    };

    const openEditModal = (article) => {
        setEditingArticle(article);
    };

    const closeEditModal = () => {
        setEditingArticle(null);
    };

    const handleUpdate = async (article) => {
        try {
            const updatedArticle = {
                _id: article._id,
                title: article.title,
                content: article.content,
                created_at: article.created_at,
                updated_at: new Date()
                    .setHours(new Date().getHours() + 1)
                    .toString(), // Update the updated_at field with the current timestamp
            };

            await axios.put(
                `http://localhost:8000/api/articles/${article._id}`,
                JSON.stringify(updatedArticle),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            closeEditModal();
            fetchArticles();
        } catch (error) {
            console.error("Error al actualizar el artículo:", error);
        }
    };

    return (
        <div className="comentarios-container">
            <div className="titulo-container">
                <h1>COMENTARIOS</h1>
            </div>
            <div className="articles-container">
                {articles.map((article) => (
                    <div
                        key={article._id}
                        className="bg-rose-200 p-4 hover:cursor-pointer hover:bg-rose-300 mb-4"
                    >
                        <h2>
                            <strong>TEMA:</strong> {article.title}
                        </h2>
                        <p>
                            <strong>CONTENIDO:</strong> {article.content}
                        </p>
                        <p>
                            <strong>Última actualización:</strong>{" "}
                            {new Date(article.updated_at).toLocaleString()}
                        </p>
                        {showButtons && (
                            <div className="button-container">
                                <button
                                    className="update-button"
                                    onClick={() => openEditModal(article)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(article._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {editingArticle && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Artículo</h2>
                        <input
                            type="text"
                            id="edit-title"
                            value={editingArticle.title}
                            onChange={(e) =>
                                setEditingArticle({
                                    ...editingArticle,
                                    title: e.target.value,
                                })
                            }
                        />
                        <textarea
                            id="edit-content"
                            value={editingArticle.content}
                            onChange={(e) =>
                                setEditingArticle({
                                    ...editingArticle,
                                    content: e.target.value,
                                })
                            }
                        ></textarea>
                        <button onClick={closeEditModal}>Cancelar</button>
                        <button onClick={() => handleUpdate(editingArticle)}>
                            Guardar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

Comentarios.propTypes = {
    showButtons: PropTypes.bool,
};

Comentarios.defaultProps = {
    showButtons: true,
};

export default Comentarios;
