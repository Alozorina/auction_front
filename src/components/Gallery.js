import {Card, Grid, Image, Link, Spacer, Text} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import React from "react";
import Arrow from "../svg/arrow-up-right-small.svg";
import {IMAGE_PATH} from "../services/item.service";

const gallery = {
    minHeight: 420,
    marginBottom: 30
};

export const Gallery = ({header, button, itemList}) => {
    const navigate = useNavigate();

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
                {itemList.map((item, index) => (
                    <Grid xs={12} sm={6} md={4} key={index}>
                        <Card isPressable onClick={()=>navigate(`/auction/${item.id}`)}
                              css={{borderRadius: '0'}}>
                            <Card.Body css={{p: 0}}>
                                <Card.Image
                                    src={IMAGE_PATH + item.itemPhotos[0].path}
                                    objectFit="cover"
                                    width="100%"
                                    height={300}
                                    alt={item.name}
                                />
                            </Card.Body>
                            <Card.Footer isBlurred css={{position: "absolute",
                                bgBlur: "#25364580", borderRadius: '0',
                                bottom: 0, zIndex: 1}}>
                                <Grid.Container gap={0} >
                                    <Grid xs={9}>
                                        <Text b>{item.name}</Text>
                                    </Grid>
                                    <Grid xs={3} justify='flex-end'>
                                        <Text b>${item.currentBid}</Text>
                                    </Grid>
                                    <Grid xs={9}>
                                        <Text size={12}>{item.createdBy}</Text>
                                    </Grid>
                                    <Grid xs={3} justify='flex-end'>
                                        <Text size={12}>Current Bid</Text>
                                    </Grid>
                                </Grid.Container>
                            </Card.Footer>
                        </Card>
                    </Grid>
                ))}
            </Grid.Container>
        </div>);
}
