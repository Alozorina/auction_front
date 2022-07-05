import axios from "axios";

const API_URL = "https://localhost:5001/api/user/";

export const getAllUsers = () => {
    return axios.get(API_URL);
};
export const getUserById = (id) => {
    return axios.get(API_URL + id);
};
export const updatePersonalInfo = (firstname, lastname, birthdate) =>{
    return axios.put(API_URL + "profile/edit", {
        firstname, lastname, birthdate})
        .then((response) => {
        return response.data;
    });
};

export const updateCreds = (oldPassword, password, email, confirmPassword) =>{
    return axios.put(API_URL + "profile/creds", {
        email, oldPassword, password, confirmPassword})
        .then((response) => {
            return response.data;
        });
};
