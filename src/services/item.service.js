import axios from "axios";

const API_URL = "https://localhost:5001/api/item/";

export const getAllSortedByStartDate = async () => {
    return await axios.get(API_URL)
        .then(resp => resp.data);
};

export const updateBid = async (itemId, currentBid, buyerId) => {
    console.log({itemId, currentBid, buyerId})
    return axios.put(API_URL + itemId, {
        currentBid, buyerId})
        .then((response) => {
            return response.data;
        });
}

export const IMAGE_PATH = "https://localhost:5001/StaticFiles/images/";