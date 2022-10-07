import React, {useEffect, useState} from "react";
import {Button, Card, Container, Grid, Spacer} from "@nextui-org/react";
import {RequireAuth} from "../../services/authorization.service";
import AuthenticationService from "../../services/authentication.service";
import {LeftNavTab} from "./LeftNavTab";
import {ChangePersonalInfoForm} from "./ChangePersonalInfoForm";
import {ChangePasswordForm} from "./ChangePasswordForm";


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

    const handleClick = () => {
        setIsPersonalProfileTab(!isPersonalProfileTab);
    };

    return (
        <Grid.Container gap={1} justify="left">
            <Grid md={3} sm={4} xs={0} css={{paddingLeft:"2%", paddingTop:"30px", backgroundColor:'#2d3e4e'}}>
                <LeftNavTab></LeftNavTab>
            </Grid>
            <Grid md={6} sm={8} xs={12} css={{paddingLeft:"2%"}}>
                {user &&
                    <Container css={{
                        margin: 'auto',
                        paddingTop: '3%',
                        minHeight: "740px"
                    }}>
                        <h3>Profile</h3>
                        <Card.Divider css={{width: '100%'}}/>
                        <Spacer y={1.2}/>
                        <Grid.Container>
                            <Grid>
                                <Button css={{borderColor: '#0072F5', backgroundColor: '$accents2', width: '20%', minWidth: '140px'}}
                                        onClick={handleClick}
                                        color='#fff'
                                        bordered={isPersonalProfileTab}
                                        flat
                                        aria-label='Personal Info'>
                                    Personal Info
                                </Button>
                            </Grid>
                            <Spacer y={1.2}/>
                            <Grid>
                                <Button onClick={handleClick}
                                        color='#fff'
                                        bordered={!isPersonalProfileTab}
                                        flat
                                        aria-label='Password'
                                        css={{borderColor: '#0072F5', backgroundColor: '$accents2', width: '20%', minWidth: '140px', zIndex: "0"}}>
                                    Password
                                </Button>
                            </Grid>
                        </Grid.Container>
                        <Spacer y={1.2}/>
                        <section>
                            {isPersonalProfileTab?
                                <ChangePersonalInfoForm ilastname={lastname} ibirthday={birthday}
                                                        ifirstname={firstname} iemail={email}></ChangePersonalInfoForm>
                                : <ChangePasswordForm></ChangePasswordForm>}
                        </section>
                    </Container>}
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