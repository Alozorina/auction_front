import React, {useEffect, useState} from "react";
import {Grid, Image} from "@nextui-org/react";
import {RequireAuth} from "../services/authorization.service";
import AuthenticationService from "../services/authentication.service";
import {UserProfile} from "./UserProfile";
import {getAllSortedByStartDate, IMAGE_PATH} from "../services/item.service";


const ProfileContent = () => {
    const [pictureName, setPictureName] = useState("");
    const [user, setUser] = useState();
    const [birthday, setBirthday] = useState('');
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [isPersonalProfileTab, setIsPersonalProfileTab] = useState(true);

    useEffect(() => {
        AuthenticationService.getCurrentUser()
            .then(userData => {
                setFirstname(userData.firstName)
                setLastname(userData.lastName)
                setBirthday(userData.birthDate)
                setEmail(userData.email)
                setUser(userData)
            });
    }, []);

    useEffect(() => {
        getAllSortedByStartDate()
            .then(resp => {
                setPictureName(resp[0].itemPhotos[0].name)
            });
    }, []);

    return (
        <Grid.Container gap={1} justify="left">
            <Grid md={3} sm={4} >
                {pictureName && <Image
                    width={320}
                    height={180}
                    src={IMAGE_PATH + pictureName}
                    alt="Default Image"
                    objectFit="cover"
                />}
            </Grid>
            <Grid md={6} sm={8} xs={12}>
                {user && <UserProfile firstname={firstname} lastname={lastname} email={email}
                                      birthday={birthday} isPersonalProfileTab={isPersonalProfileTab}
                                      setIsPersonalProfileTab={setIsPersonalProfileTab}
                ></UserProfile>}
            </Grid>
            <Grid md={3} >
            </Grid>
        </Grid.Container>
    );
};

export const UserProfilePage = () => {
    return (
        <RequireAuth roles={["User", "Admin"]}>
            <ProfileContent></ProfileContent>
        </RequireAuth>
    );
};