import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import {Button, Card, Container, Image, Input, Spacer} from "@nextui-org/react";
import {required} from "../services/validation/validator";
import { toast } from 'react-toastify';
import {validateEmailSyntax, validatePasswordLength} from "../services/validation/userValidator";
import {AppContext} from "./AppContext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const {setUser} = useContext(AppContext);

    const onChangeEmail = (e) => {
        const mail = e.target.value;
        setEmail(mail);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

   const hasErrors = !!(emailError || passwordError);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            AuthenticationService.login(email, password)
                .then(() => AuthenticationService.getCurrentUser())
                .then(
                (profile) => {
                    setUser(profile);
                    navigate("/");
                },
                (error) => {
                    toast(error.message);
                }
            );
        }
    };

    const validateEmail = (e) => {
        let input = e.target.value;
        const emailErrorMessage = required(input) || validateEmailSyntax(input);
        setEmailError(emailErrorMessage);
    }

    const validatePassword = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validatePasswordLength(input);
        setPasswordError(errorMessage);
    }

    return (
        <Container  css={{mw: "400px", marginTop: "5%"}}>
            <Card css={{mw: "400px", $$cardColor: '#384857', alignItems: "center", minHeight: "520px"}}>
                <Card.Body>
                    <Image css={{ marginTop: "15px"}}
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                    />
                    <form onSubmit={handleLogin} >
                        <Spacer y={1}/>
                        <Input width="250px"
                               onBlur={validateEmail}
                               clearable
                               shadow={false}
                               onClearClick={() => {
                                    setEmail("")
                            }}
                            helperColor={emailError ? "error" : "success"}
                            helperText={emailError}
                            type="email"
                            label="Email"
                            value={email}
                            placeholder="Email"
                            onChange={onChangeEmail}
                        />
                        <Spacer y={1.1}/>
                        <Input.Password width="250px"
                            label="Password"
                            onBlur={validatePassword}
                            onClearClick={() => {
                                setEmail("")
                            }}
                            helperColor={passwordError ? "error" : "success"}
                            helperText={passwordError}
                            placeholder="Password"
                            value={password}
                            type = "password"
                            onChange={onChangePassword}
                        />
                        <Spacer y={1.2}/>
                        <Button type="submit" css={{minWidth: "250px"}} aria-label='Login'>
                            Login
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </Container>

    );
};