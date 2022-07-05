import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Register} from "./components/Register";
import {Login} from "./components/Login";
import {Profile} from "./components/Profile";
import {Container, createTheme, NextUIProvider} from "@nextui-org/react"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            border: '$blue800',
            primaryLight: '#7fb6f5',
        },
        space: {
            5: '13px'
        },
        fonts: {
            sans: '"Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        },
        letterSpacings: {
            tighter: '0',
            tight: '0',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        }
    }
})

function App() {
    return (
        <NextUIProvider theme={darkTheme }>
            <Container fluid>
                <Routes>
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
