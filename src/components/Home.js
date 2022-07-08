import React from "react";
import {Gallery} from "./Gallery";
import {Banner} from "./Banner";

export const Home = () => {
    const homeStyle = {
        marginLeft: '8%',
        marginRight: '8%',
    };

    const auctionlist = [
        {
            title: "Orange",
            img: "/images/fruit-1.jpeg",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
        },
        {
            title: "Raspberry",
            img: "/images/fruit-3.jpeg",
            price: "$10.00",
        },
    ];

    return (
        <div style={homeStyle}>
            <Banner></Banner>
            <Gallery auctionlist={auctionlist} header={'UPCOMING AUCTIONS'} button={'VIEW ALL'}></Gallery>
            <Gallery auctionlist={auctionlist} header={'POPULAR LOTS'}></Gallery>
        </div>

    );
};