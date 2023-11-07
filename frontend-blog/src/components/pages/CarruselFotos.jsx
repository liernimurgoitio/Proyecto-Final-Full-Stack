import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";

const CarruselFotos = ({ images }) => {
    return (
        <Carousel>
            {images &&
                images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Imagen ${index + 1}`} />
                        <p className="legend">
                            Descripción de la imagen {index + 1}
                        </p>
                    </div>
                ))}
        </Carousel>
    );
};

CarruselFotos.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarruselFotos;
