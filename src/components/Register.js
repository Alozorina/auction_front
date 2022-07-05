import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import {Button, Card, Container,  Input, Spacer} from "@nextui-org/react";
import {
    required,
    validateEmailSyntax, validateEqual,
    validateLettersOnly,
    validateNameLength,
    validatePasswordLength
} from "../services/validator";
import {toast} from "react-toastify";

export const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [fnameError, setfNameError] = useState("");
    const [lnameError, setlNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confPasswordError, setconfPasswordError] = useState("");
    const navigate = useNavigate();

    const onChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
    };

    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    };

    const hasErrors = !!(emailError || passwordError || confPasswordError || lnameError || fnameError);

    const handleRegister = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            AuthenticationService.register(firstname, lastname, email, password, confirmPassword).then(
                () => {
                    navigate("/profile");
                    window.location.reload();
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

    const validateFName = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validateNameLength(input) || validateLettersOnly(input);
        setfNameError(errorMessage);
    }

    const validateLName = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validateNameLength(input) || validateLettersOnly(input);
        setlNameError(errorMessage);
    }

    const validatePassword = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validatePasswordLength(input);
        setPasswordError(errorMessage);
    }

    const validateConfPassword = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validatePasswordLength(input) || validateEqual(input, password);
        setconfPasswordError(errorMessage);
    }

    return (
        <Container css={{mw: "450px", marginTop: "6%"}}>
            <Card css={{mw: "450px", $$cardColor: '#384857', alignItems: "center", minHeight: "630px"}}>
                <Card.Body>
                    <h3>
                        SIGN UP WITH EMAIL
                    </h3>
                    <Spacer y={0.5}/>
                    <form onSubmit={handleRegister}>
                        <Input width="250px"
                               onBlur={validateFName}
                               clearable
                               shadow={false}
                               onClearClick={() => {
                                   setFirstname("")
                               }}
                               helperColor={fnameError ? "error" : "success"}
                               helperText={fnameError}
                               label="First Name"
                               value={firstname}
                               placeholder="First Name"
                               onChange={onChangeFirstname}
                        />
                        <Spacer y={1.1}/>
                        <Input width="250px"
                               onBlur={validateLName}
                               clearable
                               shadow={false}
                               onClearClick={() => {
                                   setLastname("")
                               }}
                               helperColor={lnameError ? "error" : "success"}
                               helperText={lnameError}
                               label="Last Name"
                               value={lastname}
                               placeholder="Last Name"
                               onChange={onChangeLastname}
                        />
                        <Spacer y={1.1}/>
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
                                onBlur={validatePassword}
                                label="Password"
                                placeholder="Password"
                                type = "password"
                                helperColor={passwordError ? "error" : "success"}
                                helperText={passwordError}
                                value={password}
                                onChange={onChangePassword}
                        />
                        <Spacer y={1.1}/>
                        <Input.Password width="250px"
                                onBlur={validateConfPassword}
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                type = "password"
                                helperColor={confPasswordError ? "error" : "success"}
                                helperText={confPasswordError}
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                        />
                        <Spacer y={1.5}/>
                        <Button type="submit" css={{minWidth: "250px"}}>
                            Register
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    );
};
