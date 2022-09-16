import React from "react";
import {useQuery} from "react-query";
import {searchItems} from "../../services/item.service";
import {baseMarginStyle} from "../Home";
import {Gallery} from "./Gallery";
import {useSearchParams} from "react-router-dom";
import {Text} from "@nextui-org/react"

export const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    let searchParam = searchParams.get("query");
    const {data: responseItems} = useQuery(["searchData", searchParam], () => searchItems(searchParam));

    let bottomText = !responseItems?.length && "Nothing Found";

    return (
        <div style={baseMarginStyle}>
            <Gallery
                itemList={responseItems ?? []}
                header={'SEARCH RESULTS'}>
            </Gallery>
            <Text b size="$xl" css={{marginLeft:"auto"}}>{bottomText}</Text>
        </div>

    );
};