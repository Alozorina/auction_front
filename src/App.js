import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Register} from "./components/Login_Register/Register";
import {Login} from "./components/Login_Register/Login";
import {UserProfilePage} from "./components/UserMenuPage/UserProfilePage";
import {Container, createTheme, NextUIProvider} from "@nextui-org/react"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from "react-query";
import {Home} from "./components/Home/Home";
import {Header} from "./components/Header/Header";
import {ItemPage} from "./components/Item/ItemPage";
import {AddItem} from "./components/UserMenuPage/AddItem";
import {AppContextProvider} from "./components/AppContext";
import {SearchResultPage} from "./components/Item/SearchResultPage";
import {UserLots} from "./components/UserMenuPage/UserLots";
import {UserPurchases} from "./components/UserMenuPage/UserPurchases";

const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            // brand colors
            background: '#253645',
            text: '#fff',
            selection: '#151D25',
            accents0: '#415363',
            accents2: '#142634',
            accents4: '#fff',
            border: '#fff',
            primaryLight: '#7fb6f5',
            secondaryLight: '#FFC300',
            backgroundContrast: '#384857',
            neutralLight: '#E1E1E1',
            neutralLightHover: '#96B1C5',
        },
        space: {
            5: '13px'
        },
        fonts: {
            sans: "Montserrat",
        },
        letterSpacings: {
            tighter: '0',
            tight: '0',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        },
        breakpoints: {
            xs: '520px',
            sm: '720px',
            md: '960px',
            lg: '1500px',
            xl: '1920px'
        },

    }
})

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: 2,
        },
    },
});

function App() {
    return (
        <AppContextProvider>
            <QueryClientProvider client={queryClient}>
                <NextUIProvider theme={darkTheme}>
                    <Header></Header>
                    <Container xl>
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route path="/auction/:id" element={<ItemPage/>}/>
                            <Route path="/search" element={<SearchResultPage/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route exact path="/profile" element={<UserProfilePage/>}/>
                            <Route exact path="/addlot" element={<AddItem/>}/>
                            <Route exact path="/lots" element={<UserLots/>}/>
                            <Route exact path="/purchases" element={<UserPurchases/>}/>
                        </Routes>
                    </Container>
                    <ToastContainer/>
                </NextUIProvider>
            </QueryClientProvider>
        </AppContextProvider>
    );
}

export default App;
