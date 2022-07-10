import axios from "axios";

const API_URL = "https://localhost:5001/api/item/";

export const getAllSortedByStartDate = async () => {
    return await axios.get(API_URL)
        .then(resp => resp.data);
    }

export const IMAGE_PATH = "https://localhost:5001/StaticFiles/images/";