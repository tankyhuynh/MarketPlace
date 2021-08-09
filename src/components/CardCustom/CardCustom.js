import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";

const CardCustom = ({ card }) => {
    return (
        <Card className="flex flex-col justify-evenly">
            <CardImage
                src={card.url}
                alt={card.title}
            />

            <CardBody>
                <H6 color="gray">{card.title}</H6>
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
        </Card>
    );
}

export default CardCustom;