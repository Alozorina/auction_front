import React, {useState} from "react";
import {updateCreds} from "../services/user.service";
import {toast} from "react-toastify";
import {required, validateEqual, validatePasswordLength} from "../services/validator";
import {Button, Input, Spacer} from "@nextui-org/react";

//TODO: change current token if credentials edited
export const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confPasswordError, setconfPasswordError] = useState("");

    const hasErrors = !!(newPasswordError || oldPasswordError || confPasswordError);
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            updateCreds(oldPassword, newPassword)
                .then(response =>
                    {
                        /*navigate("/profile");
                        window.location.reload();*/
                    },
                    (error) => {
                        toast(error.response.data);
                    }
                );
        }
    };

    const onChangeOldPassword = (e) => {
        const oldPassword = e.target.value;
        setOldPassword(oldPassword);
    };
    const onChangeNewPassword = (e) => {
        const password = e.target.value;
        setNewPassword(password);
    };
    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    };
    const validateOldPassword = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validatePasswordLength(input);
        setOldPasswordError(errorMessage);
    }
    const validateNewPassword = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validatePasswordLength(input);
        setNewPasswordError(errorMessage);
    }
    const validateConfPassword = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validatePasswordLength(input) || validateEqual(input, newPassword);
        setconfPasswordError(errorMessage);
    }

    return (
        <form onSubmit={handleUpdate}>
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
                   onBlur={validateNewPassword}
                   size="lg"
                   shadow={true}
                   helperColor={newPasswordError ? "error" : "success"}
                   helperText={newPasswordError}
                   label="New Password"
                   value={newPassword}
                   onChange={onChangeNewPassword}
            />
            <Spacer y={1.2}/>
            <Input.Password width="350px"
                   onBlur={validateConfPassword}
                   size="lg"
                   shadow={true}
                   helperColor={confPasswordError ? "error" : "success"}
                   helperText={confPasswordError}
                   label="Confirm New Password"
                   value={confirmPassword}
                   onChange={onChangeConfirmPassword}
            />
            <Spacer y={1.7}/>
            <Button type="submit" css={{width:"350px", minWidth: "250px", zIndex: '0'}}>
                Save
            </Button>
        </form>);
}