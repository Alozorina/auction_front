import {Button, Card, Grid, Row, Text, Col} from "@nextui-org/react";
import React from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {IMAGE_PATH} from "../services/item.service";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];


export const ItemProfile = ({item}) => {
    const paths = item.itemPhotos.map((iphoto) => {
        return {original: IMAGE_PATH +iphoto.path};
    })

    return (
        <Grid.Container gap={3} justify="center">
            <Grid justify="center" sm={8}>
                <ImageGallery
                    items={paths}
                    showPlayButton={false}
                    showBullets={true}
                    showThumbnails={false}
                    showFullscreenButton={false}/>
            </Grid>
            <Grid sm={4}>
                <Card>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>
                            <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                New
                            </Text>
                            <Text h3 color="black">
                                Acme camera
                            </Text>
                        </Col>
                    </Card.Header>
                    <Card.Divider/>
                    <Card.Body css={{py: "$10"}}>
                        <Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Text>
                    </Card.Body>
                    <Card.Divider/>
                    <Card.Footer>
                        <Row justify="flex-end">
                            <Button size="sm" light>
                                Cancel
                            </Button>
                            <Button size="sm">Agree</Button>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    )

}