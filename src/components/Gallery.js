import {Card, Grid, Image, Link, Row, Spacer, Text} from "@nextui-org/react";
import React from "react";
import Arrow from "../svg/arrow-up-right-small.svg";

const gallery = {
    minHeight: 450,
    marginBottom: 30
};

export const Gallery = ({header, button, auctionlist}) => {
    return (
        <div style={gallery}>
            <Grid.Container>
                <Grid xs={6}><h6>{header}</h6></Grid>
                <Grid xs={6} css={{justifyContent: 'end'}}>
                    <Link href="#" css={{color: '#FFC300'}}>
                        <h6>{button}</h6>
                        <Spacer x={0.5} y={0}/>
                        {button && <Image src={Arrow} alt="art"/>}
                    </Link>
                </Grid>
            </Grid.Container>
            <Card.Divider css={{
                marginTop: '15px',
                marginBottom: '40px',
                lineHeight: '1.2',
                fontSize: '33px',
                background: '#7A9CBA'
            }}/>
            <Grid.Container gap={2} justify="flex-start" css={{padding: '0'}}>
                {auctionlist.map((item, index) => (
                    <Grid xs={12} sm={6} md={4} key={index}>
                        <Card isPressable css={{borderRadius: '0'}}>
                            <Card.Body css={{p: 0}}>
                                <Card.Image
                                    src={"https://nextui.org" + item.img}
                                    objectFit="cover"
                                    width="100%"
                                    height={250}
                                    alt={item.title}
                                />
                            </Card.Body>
                            <Card.Footer css={{justifyItems: "flex-start"}}>
                                <Row wrap="wrap" justify="space-between" align="center">
                                    <Text b>{item.title}</Text>
                                    <Text css={{color: "$accents7", fontWeight: "$semibold", fontSize: "$sm"}}>
                                        {item.price}
                                    </Text>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Grid>
                ))}
            </Grid.Container>
        </div>);
}
