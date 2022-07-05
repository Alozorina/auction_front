export const required = (value) => !value && "This field is required!";

export const validateEmailSyntax = (value) => !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) && "Enter correct email";

export const validatePasswordLength = (value) =>
    value.length < 6 || value.length > 32?"Must be between 6 and 32 characters.":"";

export const validateLettersOnly= (value) =>!value.match(/^[A-Za-z]+$/) && "Only english letters allowed.";

export const validateNameLength = (value) =>
    value.length < 2 || value.length > 50?"Must be between 2 and 50 characters.":"";

export const validateEqual = (value, password) => {
    if (value !== password) {
        return (
            "Confirmation password does not match."
        );
    }
};