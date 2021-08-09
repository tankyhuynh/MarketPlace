import './Slide.css'

import React from 'react';

import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";

const Slide = ({ slide }) => {
    return (
        <Card className="flex flex-col my-16 md:flex-row">
            <CardImage
                src={slide.url}
                alt={slide.title}
                className="object-fill w-1/3"
            />

            <div className="flex flex-col items-center mx-auto justify-evenly">
                <CardBody>
                    <H6 color="gray">{slide.title}</H6>
                    <Paragraph color="gray">
                        Don't be scared of the truth because we need to restart the human
                        foundation in truth And I love you like Kanye loves Kanye I love
                        Rick Owens’ bed design but the back is...
                    </Paragraph>
                    <Paragraph color="gray">
                        Don't be scared of the truth because we need to restart the human
                        foundation in truth And I love you like Kanye loves Kanye I love
                        Rick Owens’ bed design but the back is...
                    </Paragraph>
                    
                </CardBody>

                <CardFooter>
                    <Button color="lightBlue" size="lg" ripple="light">
                        Read More
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default Slide;