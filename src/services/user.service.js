import axios from "axios";

const API_URL = "https://localhost:5001/api/user/";

export const getAllUsers = () => {
    return axios.get(API_URL);
};
export const getUserById = (id) => {
    return axios.get(API_URL + id);
};
export const updatePersonalInfo = (firstname, lastname, birthdate, email) =>{
    return axios.put(API_URL + "profile/edit", {
        firstname, lastname, email, birthdate})
        .then((response) => {
        return response.data;
    });
};

export const updateCreds = (oldPassword, newPassword) =>{
    return axios.put(API_URL + "profile/password", {
        oldPassword, newPassword})
        .then((response) => {
            return response.data;
        });
};
