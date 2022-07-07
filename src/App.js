import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Register} from "./components/Register";
import {Login} from "./components/Login";
import {Profile} from "./components/Profile";
import {Container, createTheme, NextUIProvider} from "@nextui-org/react"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Home} from "./components/Home";
import {Header} from "./components/Header";

const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            // brand colors
            background: '#253645',
            text: '#fff',
            inputColor: '#384857',
            selection: '#151D25',
            accents0: '#2B3B4A',
            border: '#fff',
            primaryLight: '#7fb6f5',
            secondaryLight: '#FFC300'
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
            lg: '1400px',
            xl: '1920px'
        },

    }
})

function App() {
    return (
        <NextUIProvider theme={darkTheme }>
            <Header></Header>
            <Container xl>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/profile" element={<Profile />} />
                </Routes>
            </Container>
            <ToastContainer />
        </NextUIProvider>
    );
}

export default App;
