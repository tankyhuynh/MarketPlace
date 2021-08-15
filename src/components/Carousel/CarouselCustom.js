import React from 'react';
import Carousel from 'react-elastic-carousel'
import Slide from '../Slide/Slide';


const CarouselCustom = ({ slides }) => {
    const renderSlides = slides.map((slide) =>{
        return (
            <div className="-mt-5 text-center md:mt-10">
                <Slide slide={slide} key={slide.id} />
            </div>
        )
    })

    return (
        <Carousel itemsToShow={1}>
            {renderSlides}
        </Carousel>
    );
}

export default CarouselCustom;