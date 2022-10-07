import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getAllSortedByStartDate} from "../../services/item.service";
import {ItemProfile} from "./ItemProfile";

export const ItemPage = () => {
    const {data: items} = useQuery("auctionsData", () =>
        getAllSortedByStartDate());
    let {id} = useParams();
    if(!items)
        return <div>Loading...</div>;
    const item = items.find(i => i.id == id);
    if(!item)
        return <div>Item not found</div>;
    return (
        item && <ItemProfile item={item}></ItemProfile>
    )
}