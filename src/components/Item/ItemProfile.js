import {Card, Col, Grid, Row, Spacer, Text} from "@nextui-org/react";
import React from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {IMAGE_PATH} from "../../services/item.service";
import Countdown from "react-countdown";
import {ModalPlaceBid} from "./ModalPlaceBid";

const Completionist = () => <span>CLOSED</span>;

export const StatusHandler = (statusName, item) => {
    switch (statusName) {
        case "Open":
        return <>
            <Grid xs={12}>
                <div> Lot closes in: &nbsp; </div>
                <Text b>
                    <Countdown date={item.endSaleDate}>
                        <Completionist/>
                    </Countdown>
                </Text>
            </Grid>
            <Grid xs={12}>
                <Text>{"End Date: "}{item.endSaleDate.replace('T', ',  Time: ')}</Text>
            </Grid>
        </>
        case "Upcoming":
            return <>
                <Grid xs={12}>
                    <div> Lot opens in: &nbsp; </div>
                    <Text b>
                        <Countdown date={item.startSaleDate}>
                            <Completionist/>
                        </Countdown>
                    </Text>
                </Grid>
                <Grid xs={12}>
                    <Text>{"Start Date: "}{item.startSaleDate.replace('T', ',  Time: ')}</Text>
                </Grid>
            </>
        default:
            return <Grid xs={12}>
                <div> Status: &nbsp; </div>
                <Text b>
                    {statusName}
                </Text>
            </Grid>
    }
}

export const ItemProfile = ({item}) => {
    const paths = item.itemPhotos.map((iphoto) => {
        return {
            original: IMAGE_PATH + iphoto.path,
            originalHeight: '50%'
        };
    });

    return (
        <Grid.Container gap={3} justify="center">
            <Grid justify="center" md={8}>
                <ImageGallery
                    items={paths}
                    showPlayButton={false}
                    showBullets={true}
                    showThumbnails={false}
                    showFullscreenButton={false}/>
            </Grid>
            <Grid md={4} css={{maxHeight: '90vh', minHeight: '660px'}}>
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
                    </Card.Body>
                    <Card.Divider/>
                    <Spacer y={1} x={0}/>
                    <Card.Footer>
                        <Grid.Container justify="flex-start">
                            {StatusHandler(item.status, item)}
                            <Spacer y={2.5} x={0}/>
                            <Grid xs={12}>
                                <ModalPlaceBid item={item}></ModalPlaceBid>
                            </Grid>
                        </Grid.Container>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    )

}