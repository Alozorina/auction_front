import {Card, Col, Grid, Row, Spacer, Text} from "@nextui-org/react";
import React from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {IMAGE_PATH} from "../services/item.service";
import Countdown from "react-countdown";
import {ModalPlaceBid} from "./ModalPlaceBid";

export const ItemProfile = ({item}) => {

    const paths = item.itemPhotos.map((iphoto) => {
        return {
            original: IMAGE_PATH + iphoto.path,
            originalHeight: '50%'
        };
    });
    const Completionist = () => <span>CLOSED</span>;

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
            <Grid sm={4} css={{maxHeight: '90vh'}}>
                <Card css={{padding: '20px'}}>
                    <Card.Header css={{zIndex: 1, top: 5}}>
                        <Col>
                            <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                {item.status.name}
                            </Text>
                            <Text h3>
                                {item.createdBy}
                            </Text>
                            <Text size={20}>{item.name}</Text>
                            <Spacer y={1} x={0}/>
                            <Row>
                                <Col>
                                    Current Bid:
                                    <Text b>{' '}${item.currentBid}</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Card.Header>
                    {item.description && <Card.Divider/>}
                    <Card.Body css={{py: "$10"}}>
                        <Text size={14}>
                            {item.description}
                        </Text>
                        <Spacer y={1} x={0}/>
                        <Card.Divider/>
                        <Spacer y={1} x={0}/>
                        <Row>
                            {(item.status.id === 4) &&
                                <Col>
                                    Lot closes in: {' '}
                                    <Text b>
                                        <Countdown date={item.endSaleDate}>
                                            <Completionist/>
                                        </Countdown>
                                    </Text>
                                </Col>}
                            {(item.status.id === 2) &&
                                <Col>
                                    Lot opens in: {' '}
                                    <Text b>
                                        <Countdown date={item.startSaleDate}>
                                            <Completionist/>
                                        </Countdown>
                                    </Text>
                                </Col>}
                        </Row>
                        {(item.status.id === 4) &&
                            <Text>{"End Date: "}{item.endSaleDate.replace('T', ',  Time: ')}</Text>}
                        {(item.status.id === 2) &&
                            <Text>{"Start Date: "}{item.startSaleDate.replace('T', ',  Time: ')}</Text>}
                    </Card.Body>
                    <Card.Footer>
                        <Row justify="flex-start" css={{paddingBottom: '10px'}}>
                            <ModalPlaceBid item={item}></ModalPlaceBid>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    )

}