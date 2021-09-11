import React, { useRef } from 'react';
import Carousel from 'react-elastic-carousel'
import Slide from '../Slide/Slide';


const CarouselCustom = ({ slides, organizations }) => {
    const renderSlides = slides.map((slide) =>{
        return (
            <div className="-mt-5 text-center text-black md:mt-10" key={slide.id}>
                <Slide slide={slide} organizations={organizations} key={slide.id} />
            </div>
        )
    })

    let resetTimeout;
    const playSpeed = 3000;
    const itemsPerPage = 1;
    const totalPages = Math.ceil(slides.length / itemsPerPage);
    const carouselRef = useRef(null);

    return (
        <Carousel 
            ref={carouselRef}
            itemsToShow={itemsPerPage} 
            enableAutoPlay 
            autoPlaySpeed={playSpeed}
            onNextEnd={({ index }) => {
                if(index){
                    clearTimeout(resetTimeout)
                    if (index + 1 === totalPages) {
                    resetTimeout = setTimeout(() => {
                        if(carouselRef.current){
                            carouselRef.current.goTo(0)
                        }
                    }, playSpeed) // same time
                    }
                }
           }}
        >
            {renderSlides}
        </Carousel>
    );
}

export default CarouselCustom;