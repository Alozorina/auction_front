import React, {useEffect, useState} from "react";
import AuthenticationService from "./authentication.service";
import {Navigate, useLocation} from "react-router-dom";


export const useAccessManager = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        AuthenticationService.getCurrentUser()
            .then(userData => {setUser(userData)});
    },[]);
    return user;
};

export function RequireAuth({children, roles}) {
    let user = useAccessManager();
    let location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    if (!roles.includes(user.role))
        return <div>Access Denied!</div>
    return (children);
}