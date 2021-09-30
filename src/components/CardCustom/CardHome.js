import './CardCustom.css'

import React from "react";
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";

import img1_a from '../../assets/img1_a.png';
import img1_b from '../../assets/img1_b.png';
import img2_a from '../../assets/img2_a.png';
import img2_b from '../../assets/img2_b.png';
import img3_a from '../../assets/img3_a.jpg';
import img3_b from '../../assets/img3_b.png';
import img5_a from '../../assets/img5_a.jpg';
import img5_b from '../../assets/img5_b.png';
// import logo from '../../assets/logo.png';


const CardCustom = ({ card }) => {
    const randomImages = [img1_a, img1_b, img2_a, img2_b, img3_a, img3_b, img5_a, img5_b];

    const renderImage = (image) => {
        if(image){
             switch(image){
                 case "img1_a": return img1_a;
                 case "img1_b": return img1_b;
                 case "img2_a": return img2_a;
                 case "img2_b": return img2_b;
                 case "img3_a": return img3_a;
                 case "img3_b": return img3_b;
                 case "img5_a": return img5_a;
                 case "img5_b": return img5_b;
                 default: return image;
             }
        }
        const j = Math.floor(Math.random() * ((randomImages.length -1)));
        return randomImages[j];
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

    const renderTen = (ten) => {
        if(ten){
            if (ten.length > 40) {
                var shortname = ten.substring(0, 40) + " ...";
                return shortname;
            }
        }
        return ten;
    }

    

    const renderUuDiem = (uuDiems) => {
        if(uuDiems){
           if(Array.isArray(uuDiems)){
                let uuDiemStr = '';
                uuDiems.map(uuDiem => {
                    return uuDiemStr += uuDiem;
                })

                if(uuDiemStr.length > 100){
                    var shortUuDiem = uuDiemStr.substring(0, 100) + "...";
                    return shortUuDiem;
                }
           }
           return uuDiems;
        }
    };
    
    return (
        // <Card className="flex flex-col justify-between card">
        <Card className="grid justify-between grid-flow-row card">
            <img
                src={ renderImage(renderImageSrc(card)) }
                alt={ card.ten }
                // className="self-center h-64"
                className="object-cover object-center w-full my-2 rounded-lg max-h-64"
            />
            <CardBody>
                <div className="text-xl font-bold">{ renderTen(card.name) }</div>
                <div 
                    className="mt-6"
                    dangerouslySetInnerHTML={{ __html: renderUuDiem(card.advantage) ? renderUuDiem(card.advantage).substring(0, 100) : '' }} 
                />
            </CardBody>

            <CardFooter>
                <Button color="lightBlue" size="lg" ripple="light">
                    Xem chi tiết ...
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CardCustom;