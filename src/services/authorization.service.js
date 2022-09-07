import React, {useContext, useEffect, useState} from "react";
import AuthenticationService from "./authentication.service";
import {Navigate, useLocation} from "react-router-dom";
import {AppContext} from "../components/AppContext";

// todo remove
export const useAccessManager = () => {
    return useContext(AppContext);
};

export function RequireAuth({children, roles}) {
    let {user, isUserLoaded} = useAccessManager();
    let location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    if (!isUserLoaded) {
        return <div>Loading</div>
    }
    if (!roles.includes(user.role))
        return <div>Access Denied!</div>

    return (children);
}