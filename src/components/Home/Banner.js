import Art from "../../images/steve-johnson-unsplash.jpg";
import {Button, Card, Text} from "@nextui-org/react";
import Arrow from "../../svg/arrow-up-right.svg";
import {useNavigate} from "react-router-dom";
import React from "react";

const bannerFirstBlock = {
    minHeight: 720,
};
const bannerImg = {
    position: 'relative',
    marginLeft: '5%',
    width: '95%',
    height: 550,
    objectFit: "cover"
}
const cardContent = {
    paddingLeft: 40,
    paddingTop: 20,
};

export const Banner = () => {
    const navigate = useNavigate();
    return (
        <div style={bannerFirstBlock}>
            <img style={bannerImg} src={Art} alt="art"/>
            <Card css={{
                minWidth: "390px", width: "37%", minHeight: "280px", backgroundColor: '#465A6C',
                borderRadius: '0', position: "absolute", top: '450px'
            }}>
                <Card.Body>
                    <div style={cardContent}>
                        <h6>THE FUTURE OF ART</h6>
                        <Text h2 weight='normal' css={{marginTop: '15px', lineHeight: '1.2', fontSize: '33px'}}>
                            Steve Johnson's Bright Colors
                        </Text>
                        <Card.Divider css={{width: '200px', marginTop: '20px', marginBottom: '20px'}}/>
                        <h6>22 MAY 2023</h6>
                        <Button css={{
                            color: '#FFC300',
                            marginTop: '25px',
                            fontSize: '20px',
                            padding: '0px',
                            fontWeight: '700'
                        }}
                                light auto
                                onClick={() => navigate("/auction/1")}
                                iconRight={<img src={Arrow} alt="icon"/>}>
                            SEE MORE
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}