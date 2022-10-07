import {between} from "./validator";

export const validateNameLength = (value) =>
    between(2, 50)(value);
export const validateEmailSyntax = (value) => !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) && "Enter correct email";
export const validatePasswordLength = (value) =>
    between(8,32)(value);
export const validateEqual = (value, password) => {
    if (value !== password) {
        return (
            "Confirmation password does not match."
        );
    }
};