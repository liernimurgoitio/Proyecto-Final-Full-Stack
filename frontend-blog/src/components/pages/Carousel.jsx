import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";
import "../../styles/carousel.css"

const CarouselFotos = ({ images }) => {
    return (
        <Carousel className="carousel">
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

CarouselFotos.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

export default CarouselFotos;  