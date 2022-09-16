import axios from "axios";

const API_URL = "https://localhost:5001/api/item/";

export const getAllSortedByStartDate = async () => {
    return await axios.get(API_URL)
        .then(resp => resp.data);
};

export const searchItems = async (searchParams) => {
    return await axios.get(API_URL + "search=" + `${searchParams}`)
        .then(resp => resp.data);
};

export const addItem = async (name, createdBy, ownerId, startingPrice, startSaleDate,
                              endSaleDate, itemCategories, itemPhotos, description) => {
    return await axios.post(API_URL, {
        name, createdBy, ownerId, startingPrice, startSaleDate,
        endSaleDate, itemCategories, itemPhotos, description
    })
        .then(resp => resp.data);
}

export const updateBid = async (itemId, currentBid, buyerId) => {
    return axios.put(API_URL + itemId, {
        currentBid, buyerId
    })
        .then((response) => {
            return response.data;
        });
}

export const IMAGE_PATH = "https://localhost:5001/StaticFiles/images/";