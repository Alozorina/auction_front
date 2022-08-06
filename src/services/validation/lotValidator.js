import {between} from "./validator";

export const validateLotInputStringLength = (value) =>
    between(3, 80)(value);

export const validateLotPrice = (value) =>
    value <= 0 ? "Must be greater than 0." : "";

export const validateDescription = (value) =>
    value.length > 1000 ? "Must be less than 1000 characters." : "";