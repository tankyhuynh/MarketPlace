import './Slide.css'

import React from 'react';

import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";

import img1_a from '../../assets/img1_a.png';
import img1_b from '../../assets/img1_b.png';
import img2_a from '../../assets/img2_a.png';
import img2_b from '../../assets/img2_b.png';
import img3_a from '../../assets/img3_a.jpg';
import img3_b from '../../assets/img3_b.png';
import img5_a from '../../assets/img5_a.jpg';
import img5_b from '../../assets/img5_b.png';
import { Link } from 'react-router-dom';

const Slide = ({ slide }) => {

    const renderImage = (image) => {
        switch(image){
            case "img1_a": return img1_a;
            case "img1_b": return img1_b;
            case "img2_a": return img2_a;
            case "img2_b": return img2_b;
            case "img3_a": return img3_a;
            case "img3_b": return img3_b;
            case "img5_a": return img5_a;
            case "img5_b": return img5_b;
            default: return null;
        }
    }
    const renderImageSrc = (card) => {
        const { hinhAnhTongThe } = card;
        if( hinhAnhTongThe ){
            if(hinhAnhTongThe.length === 2){
                return hinhAnhTongThe[0];
            }
            else return hinhAnhTongThe;
        }
    };

    const renderUuDiem = (uuDiems) => {
        if(uuDiems){
            return uuDiems.map(uuDiem => {
                return <div>{uuDiem}</div>
            })
        }
    }

    return (
        <Card className="grid my-16 place-content-between lg:grid-cols-3">
            <div className="grid lg:col-span-1 place-content-center">
                <img
                    src={renderImage(renderImageSrc(slide))}
                    alt={slide.ten}
                    className="self-center h-64 rounded-lg"
                />
            </div>

            <div className="flex flex-col items-center mx-auto lg:col-span-2 justify-evenly">
                <CardBody>
                    <div className="mb-4 text-xl font-bold">{ slide.ten }</div>
                    <div className="flex flex-col text-left">
                        { renderUuDiem(slide.uuDiem) }
                    </div>
                    
                </CardBody>

                <CardFooter>
                    <Link 
                        to={`/projects/show/${slide.id}`} 
                        color="lightBlue"
                        className="px-8 py-4 font-bold text-white uppercase slide--btn rounded-xl"
                    >
                        Xem chi tiết ...
                    </Link>
                </CardFooter>
            </div>
        </Card>
    );
}

export default Slide;