import React, {useState} from "react";
import {Button, Input, Spacer} from "@nextui-org/react";
import {
    getPastDate,
    required,
    validateLettersOnly,
} from "../../services/validation/validator";
import {toast} from "react-toastify";
import {updatePersonalInfo} from "../../services/user.service";
import {useNavigate} from "react-router-dom";
import {validateEmailSyntax, validateNameLength} from "../../services/validation/userValidator";


export const ChangePersonalInfoForm = ({ibirthday, ifirstname, ilastname, iemail}) => {
    const [email, setEmail] = useState(iemail);
    const [birthdate, setBirthdate] = useState(ibirthday??"");
    const [firstname, setFirstname] = useState(ifirstname);
    const [lastname, setLastname] = useState(ilastname);
    const [fnameError, setfNameError] = useState("");
    const [lnameError, setlNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const hasErrors = !!(emailError || lnameError || fnameError);
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            updatePersonalInfo(firstname, lastname, birthdate, email)
                .then(response =>
                {
                    setFirstname(response.firstName)
                    setLastname(response.lastName)
                    setBirthdate(response.birthDate)
                    setEmail(response.email)
                    /*navigate("/profile");
                    window.location.reload();*/
                },
                (error) => {
                    console.log({error});
                    toast(error.message);
                }
            );
        }
    };

    const onChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
    };
    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
    };
    const onChangeEmail = (e) => {
        const mail = e.target.value;
        setEmail(mail);
    };
    const onChangeDate = (e) => {
        const birthday = e.target.value;
        setBirthdate(birthday);
    };

    let minDate = getPastDate(110);
    let maxDate = getPastDate(18);

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
    const validateEmail = (e) => {
        let input = e.target.value;
        const emailErrorMessage = required(input) || validateEmailSyntax(input);
        setEmailError(emailErrorMessage);
    }

    let inputStyleCss = {width:"100%", minWidth: "240px"};
    return (
        <form onSubmit={handleUpdate}>
            <Input css={inputStyleCss}
                   onBlur={validateFName}
                   size="lg"
                   shadow={true}
                   helperColor={fnameError ? "error" : "success"}
                   helperText={fnameError}
                   label="First Name"
                   value={firstname}
                   onChange={onChangeFirstname}
            />
            <Spacer y={1.2}/>
            <Input css={inputStyleCss}
                   onBlur={validateLName}
                   size="lg"
                   shadow={true}
                   helperColor={lnameError ? "error" : "success"}
                   helperText={lnameError}
                   label="Last Name"
                   value={lastname}
                   onChange={onChangeLastname}
            />
            <Spacer y={1.2}/>
            <Input css={inputStyleCss}
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
            <Input css={inputStyleCss}
                   type="date"
                   min={minDate}
                   max={maxDate}
                   size="lg"
                   shadow={true}
                   label="Birth Date"
                   value={birthdate}
                   onChange={onChangeDate}
            />
            <Spacer y={1.7}/>
            <Button type="submit" aria-label='Save'css={{width:"100%", minWidth: "240px", zIndex: '0'}}>
                Save
            </Button>
        </form>);
};