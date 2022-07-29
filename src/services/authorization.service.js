import React, {useEffect, useState} from "react";
import AuthenticationService from "./authentication.service";
import {Navigate, useLocation} from "react-router-dom";


export const useAccessManager = () => {
    const [user, setUser] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthenticationService.getCurrentUser()
            .then(userData => {
                setUser(userData)
                setIsLoaded(true)
            });
    },[]);
    return { user, isLoaded };
};

export function RequireAuth({children, roles}) {
    let {user, isLoaded} = useAccessManager();
    let location = useLocation();

    if (!isLoaded) {
        return <div>Loading</div>
    }
    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    if (!roles.includes(user.role))
        return <div>Access Denied!</div>

    return (children);
}