import React, {useEffect, useState} from "react";
import {Grid, Image} from "@nextui-org/react";
import {RequireAuth} from "../services/authorization.service";
import AuthenticationService from "../services/authentication.service";
import {NavigationTab} from "./NavigationTab";


const ProfileContent = () => {
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

    return (
        <Grid.Container gap={1} justify="left">
            <Grid xs={4}>
                <Image
                    width={320}
                    height={180}
                    src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                    alt="Default Image"
                    objectFit="cover"
                />
            </Grid>
                <Grid xs={8}>
                    {user && <NavigationTab firstname={firstname} lastname={lastname} email={email}
                                            birthday={birthday} isPersonalProfileTab={isPersonalProfileTab}
                                            setIsPersonalProfileTab={setIsPersonalProfileTab}
                    ></NavigationTab>}
                </Grid>
        </Grid.Container>
    );
};

export const Profile = () => {
    return (
        <RequireAuth roles={["User", "Admin"]}>
            <ProfileContent></ProfileContent>
        </RequireAuth>
    );
};