import React, {useState} from "react";
import {updateCreds} from "../services/user.service";
import {toast} from "react-toastify";
import {required, validateEmailSyntax, validateEqual, validatePasswordLength} from "../services/validator";
import {Button, Input, Spacer} from "@nextui-org/react";

//TODO: change current token if credentials edited
export const ChangeLoginPasswordForm = ({iemail}) => {
    const [email, setEmail] = useState(iemail);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confPasswordError, setconfPasswordError] = useState("");

    const hasErrors = !!(emailError || passwordError || oldPasswordError || confPasswordError);
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            updateCreds(oldPassword, password, email, confirmPassword)
                .then(response =>
                    {
                        setEmail(response.email)
                        /*navigate("/profile");
                        window.location.reload();*/
                    },
                    (error) => {
                        toast(error.message);
                        //TODO: remove
                        console.log({error});
                        setOldPasswordError(error.message)
                    }
                );
        }
    };

    const onChangeEmail = (e) => {
        const mail = e.target.value;
        setEmail(mail);
    };
    const onChangeOldPassword = (e) => {
        const oldPassword = e.target.value;
        setOldPassword(oldPassword);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    };
    const validateEmail = (e) => {
        let input = e.target.value;
        const emailErrorMessage = required(input) || validateEmailSyntax(input);
        setEmailError(emailErrorMessage);
    }
    const validateOldPassword = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validatePasswordLength(input);
        setOldPasswordError(errorMessage);
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
        <form onSubmit={handleUpdate}>
            <Input width="350px"
                   onBlur={validateEmail}
                   size="lg"
                   shadow={true}
                   helperColor={emailError ? "error" : "success"}
                   helperText={emailError}
                   label="Email"
                   value={email}
                   onChange={onChangeEmail}
            />
            <Spacer y={1.2}/>
            <Input.Password width="350px"
                   onBlur={validateOldPassword}
                   size="lg"
                   shadow={true}
                   helperColor={oldPasswordError ? "error" : "success"}
                   helperText={oldPasswordError}
                   label="Current Password"
                   value={oldPassword}
                   onChange={onChangeOldPassword}
            />
            <Spacer y={1.2}/>
            <Input.Password width="350px"
                   onBlur={validatePassword}
                   size="lg"
                   shadow={true}
                   helperColor={passwordError ? "error" : "success"}
                   helperText={passwordError}
                   label="New Password"
                   value={password}
                   onChange={onChangePassword}
            />
            <Spacer y={1.2}/>
            <Input.Password width="350px"
                   onBlur={validateConfPassword}
                   size="lg"
                   shadow={true}
                   helperColor={confPasswordError ? "error" : "success"}
                   helperText={confPasswordError}
                   label="Confirm New Password"
                   value={password}
                   onChange={onChangeConfirmPassword}
            />
            <Spacer y={1.7}/>
            <Button type="submit" css={{width:"350px", minWidth: "250px", zIndex: '0'}}>
                Save
            </Button>
        </form>);
}