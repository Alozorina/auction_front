import {createContext, useState} from "react";

export const AppContext = createContext({
    user: null,
    isUserLoaded: false,
});

export const AppContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const setLoadedUser = (newUser) => {
        setUser(newUser);
        setIsUserLoaded(true);
    }

    const value = {user, setUser: setLoadedUser, isUserLoaded };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

