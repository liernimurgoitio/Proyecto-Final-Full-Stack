import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import "../../styles/articlesForm.css";

function ArticlesForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        document.title = "Edit Article";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("http://localhost:8000/api/articles", {
            mode: "cors",
            credentials: "include",
            title,
            content,
        });
        console.log(res);

        e.target.reset(); // resetea el formulario.
    };

    return (
        <section className="articles-form">
            <div className="articles-container">
                <strong>DEJA TU OPINION</strong>
            </div>
            <form className="input-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="edit-title"
                    placeholder="title"
                    className="title-input"
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <textarea
                    id="edit-content"
                    name="content"
                    placeholder="content"
                    rows="3"
                    className="content-textarea"
                    onChange={(e) => setContent(e.target.value)}
                />

                <Button type="submit">
                    <strong>Submit</strong>
                </Button>
            </form>
        </section>
    );
}

ArticlesForm.propTypes = {
    showButtons: PropTypes.bool,
};

ArticlesForm.defaultProps = {
    showButtons: true,
};

export default ArticlesForm;
