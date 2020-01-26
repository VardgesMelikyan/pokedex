import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './style.css';

function Slider(props) {
    const autoplay = props.autoplay;
    const pokemonImg = props.pokemonImg;
    return (
        <Carousel
            autoPlay={autoplay}
            showIndicators={false}
            showThumbs={false}
            showArrows={true}
            showStatus={false}
            stopOnHover
        >
            <div className="carouselImg">
                <img src={pokemonImg.front_default} />
            </div>
            <div className="carouselImg">
                <img src={pokemonImg.back_default} />
            </div>
            <div className="carouselImg">
                <img src={props.pokemonImg.front_shiny} />
            </div>
            <div className="carouselImg">
                <img src={props.pokemonImg.back_shiny} />
            </div>
        </Carousel>
    );
}
export default Slider;