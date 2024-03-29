import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "https://localhost:5001/api/user/";

const register = (firstname,lastname, email, password,confirmPassword) => {
    return axios.post(API_URL + "register", {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
    })
        .then(response => {
            const token  =  response.data.token;
            localStorage.setItem("token", token);
            setAuthToken(token);
            return response.data;
        });
};

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const initToken = () => {
    let token = localStorage.getItem("token");
    if(token)
        setAuthToken(token);
};

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then(response => {
            const token  =  response.data;
            localStorage.setItem("token", token);
            setAuthToken(token);
        });
};

let cachedProfile;

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    cachedProfile = null;
    return axios.post(API_URL + "logout");
};

const getCurrentUser = async () => {
    if(cachedProfile)
        return cachedProfile;
    let token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    let userDataFromToken = jwt_decode(token);
    let response = await axios.get(API_URL + "profile");
    let user = response.data;
    cachedProfile = {...user,
        email: userDataFromToken.Email,
        role: userDataFromToken.Role,
        id: userDataFromToken.Id,
    };
    return cachedProfile;
};

const AuthenticationService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthenticationService;