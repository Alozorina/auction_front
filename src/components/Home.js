import React from "react";
import {Gallery} from "./Gallery";
import {Banner} from "./Banner";
import {getAllSortedByStartDate} from "../services/item.service";
import {useQuery} from "react-query";

export const Home = () => {
    const {isLoading, error, data : items, isFetching} = useQuery("auctionsData", () =>
            getAllSortedByStartDate());

    const homeStyle = {
        marginLeft: '8%',
        marginRight: '8%',
    };

    const itemList = items?? [];

    return (
        <div style={homeStyle}>
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