import React from "react";
import {Gallery} from "./Item/Gallery";
import {Banner} from "./Banner";
import {getAllSortedByStartDate} from "../services/item.service";
import {useQuery} from "react-query";

export const baseMarginStyle = {
    margin: "4% 8% 0 8%"
};

export const Home = () => {
    const {data : items} = useQuery("auctionsData", () =>
            getAllSortedByStartDate());

    const itemList = items?? [];

    return (
        <div style={baseMarginStyle}>
            <Banner></Banner>
            {items && <Gallery
                itemList={itemList.filter(i => i.status === "Open")}
                header={'POPULAR LOTS'}
                button={'VIEW ALL'}>
            </Gallery>}
            {items && <Gallery
                itemList={itemList.filter(i => i.status === "Upcoming")}
                header={'UPCOMING AUCTIONS'}
                button={'VIEW ALL'}>
            </Gallery>}
        </div>

    );
};