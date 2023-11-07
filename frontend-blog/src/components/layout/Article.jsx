import React from "react";
import PropTypes from "prop-types";

function Article({ title, content }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

Article.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Article;
