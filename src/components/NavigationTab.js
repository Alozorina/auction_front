import React from "react";
import {ChangePersonalInfoForm} from "./ChangePersonalInfoForm";
import {ChangePasswordForm} from "./ChangePasswordForm";
import {Button, Card, Grid, Spacer} from "@nextui-org/react";


export const NavigationTab = ({ firstname, lastname, email, birthday, isPersonalProfileTab, setIsPersonalProfileTab }) => {

    const handleClick = () => {
        setIsPersonalProfileTab(!isPersonalProfileTab);
    };

    return (
        <Card css={{
            mw: "800px",
            $$cardColor: '#384857',
            margin: 'auto',
            paddingLeft: '3%',
            minHeight: "740px"
        }}>
            <Card.Body>
                <h3>Profile</h3>
                <Card.Divider/>
                <Spacer y={1.2}/>
                <Grid.Container>
                    <Grid>
                        <Button onClick={handleClick}
                                color='#fff'
                                bordered={isPersonalProfileTab}
                                flat
                                css={{borderColor: '#0072F5', backgroundColor: '#3f566b', width: '158px'}}>
                            Personal Info
                        </Button>
                    </Grid>
                    <Spacer y={1.2}/>
                    <Grid>
                        <Button onClick={handleClick}
                                color='#fff'
                                bordered={!isPersonalProfileTab}
                                flat
                                css={{borderColor: '#0072F5', backgroundColor: '#3f566b', width: '158px'}}>
                            Login & Password
                        </Button>
                    </Grid>
                </Grid.Container>
                <Spacer y={1.2}/>
                <section>
                    {isPersonalProfileTab?
                        <ChangePersonalInfoForm ilastname={lastname} ibirthday={birthday}
                                                        ifirstname={firstname} iemail={email}></ChangePersonalInfoForm>
                        : <ChangePasswordForm iemail={email} ></ChangePasswordForm>}
                </section>
            </Card.Body>
        </Card>
    );
};