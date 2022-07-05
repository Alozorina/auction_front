import React, {useState} from "react";
import {Button, Input, Spacer} from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css";
import {required, validateLettersOnly, validateNameLength} from "../services/validator";
import {toast} from "react-toastify";
import {updatePersonalInfo} from "../services/user.service";
import {useNavigate} from "react-router-dom";


export const ChangePersonalInfoForm = ({ibirthday, ifirstname, ilastname}) => {
    const [birthdate, setBirthdate] = useState(ibirthday??"");
    const [firstname, setFirstname] = useState(ifirstname);
    const [lastname, setLastname] = useState(ilastname);
    const [fnameError, setfNameError] = useState("");
    const [lnameError, setlNameError] = useState("");
    const navigate = useNavigate();

    const hasErrors = !!(lnameError || fnameError);
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            updatePersonalInfo(firstname, lastname, birthdate)
                .then(response =>
                {
                    setFirstname(response.firstName)
                    setLastname(response.lastName)
                    setBirthdate(response.birthDate)
                    /*navigate("/profile");
                    window.location.reload();*/
                },
                (error) => {
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
    const onChangeDate = (e) => {
        const birthday = e.target.value;
        setBirthdate(birthday);
    };

    const dateComparer = (number) => number < 10 ? '0' + number : number;
    const getDate = (years) => {
        let currentdate = new Date();
        return `${currentdate.getFullYear() - years}-${dateComparer(currentdate.getMonth() + 1)}-${dateComparer(currentdate.getDate())}`;
    }
    let minDate = getDate(110);
    let maxDate = getDate(18);

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
    return (
        <form onSubmit={handleUpdate}>
            <Input width="350px"
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
            <Input width="350px"
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
            <Input width="350px"
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
            <Button type="submit" css={{width:"350px", minWidth: "250px", zIndex: '0'}}>
                Save
            </Button>
        </form>);
};