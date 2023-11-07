import React from "react";

import "../../styles/footer.css";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            Lierni Murgoitio &copy; {currentYear}
        </footer>
    );
};
