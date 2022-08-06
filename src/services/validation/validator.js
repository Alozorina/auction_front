export const required = (value) => !value && "This field is required!";

export const between = (min, max) => (value) => value.length < min || value.length > max ? `Must be between ${min} and ${max} characters.` : "";

export const validateLettersOnly = (value) => !value.match(/^[A-Za-z]+$/) && "Only english letters allowed.";

const dateComparer = (number) => number < 10 ? '0' + number : number;

export const getPastDate = (years, months, days) => {
    let currentdate = new Date();
    return `${currentdate.getFullYear() - years}-${dateComparer(currentdate.getMonth() - months + 1)}-${dateComparer(currentdate.getDate() - days)}`;
}

export const getFutureDate = (days) => {
    let currentdate = new Date();
    currentdate.setDate(currentdate.getDate() + days);
    return `${currentdate.getFullYear()}-${dateComparer(currentdate.getMonth()  + 1)}-${dateComparer(currentdate.getDate())}`;
}

export const validateNumGreaterThan = (value, comparer) => {
    let num = Math.abs(parseInt(value));
    if (isNaN(num) || !num)
        return "Incorrect value";
    if (num <= comparer)
        return `Should be greater than ${comparer}`
}