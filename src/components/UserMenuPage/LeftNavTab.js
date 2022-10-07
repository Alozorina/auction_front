import React from "react";
import {Card, Grid} from "@nextui-org/react";
import {NavLink} from "react-router-dom";

export const LeftNavTab = () => {
    return (
        <Grid.Container gap={4} justify="left" css={{alignContent: 'start'}}>
            <Grid xs={12}>
                <NavLink
                    to="/profile"
                    style={({isActive}) => ({
                        color: isActive ? "#FFC300" : "#fff"
                    })}>
                    PROFILE
                </NavLink>
            </Grid>
            <Card.Divider css={{width: '95%'}}/>
            <Grid xs={12}>
                <NavLink
                    to="/lots"
                    style={({isActive}) => ({
                        color: isActive ? "#FFC300" : "#fff"
                    })}>
                    MY LOTS
                </NavLink>
            </Grid>
            <Card.Divider css={{width: '95%'}}/>
            <Grid xs={12}>
                <NavLink
                    to="/purchases"
                    style={({isActive}) => ({
                        color: isActive ? "#FFC300" : "#fff"
                    })}>
                    MY PURCHASES
                </NavLink>
            </Grid>
            <Card.Divider css={{width: '95%'}}/>
            <Grid xs={12}>
                <NavLink
                    to="/addlot"
                    style={({isActive}) => ({
                        color: isActive ? "#FFC300" : "#fff"
                    })}>
                    ADD LOT
                </NavLink>
            </Grid>
        </Grid.Container>
    )
}