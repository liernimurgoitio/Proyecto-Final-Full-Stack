import React from "react";
import PropTypes from "prop-types";

function ArticleList({ articles }) {
    const sortedArticles = articles.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    ); // Articulos de mas reciente a mas antiguos en base a fecha de actualización.
    return (
        <div className="grid grid-rows-1 gap-4 pt-10 pb-16 pl-36 pr-36">
            {sortedArticles.map((article) => (
                <div
                    key={article._id}
                    className="bg-rose-200 p-4 hover:cursor-pointer hover:bg-rose-300"
                >
                    <h2>
                        <strong>TEMA:</strong> {article.title}
                    </h2>
                    <p>
                        <strong>CONTENIDO</strong> {article.content}
                    </p>
                </div>
            ))}
        </div>
    );
}

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string,
        })
    ).isRequired,
};

export default ArticleList;
