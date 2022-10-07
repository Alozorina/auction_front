import React from "react";
import {useQuery} from "react-query";
import {getPurchases} from "../../services/item.service";
import {Gallery} from "../Item/Gallery";
import {Text, Grid, Container, Spacer} from "@nextui-org/react"
import {useAccessManager} from "../../services/authorization.service";
import {LeftNavTab} from "./LeftNavTab";

export const UserPurchases = () => {
    let {user} = useAccessManager();
    const {data: items} = useQuery("userPurchases", () =>
        getPurchases(user.id));

    let bottomText = !items?.length && "You don't have any purchases";

    return (
        <Grid.Container gap={1} justify="left">
            <Grid md={3} sm={4} xs={0} css={{paddingLeft: "2%", paddingTop: "30px", backgroundColor: '#2d3e4e'}}>
                <LeftNavTab></LeftNavTab>
            </Grid>
            <Grid md={9} sm={8} xs={12} css={{paddingLeft: "2%"}}>
                {user &&
                    <Container css={{
                        margin: 'auto',
                        paddingTop: '2%',
                    }}>
                        <Spacer y={1.2}/>
                        <Gallery
                            itemList={items ?? []}
                            header={'MY PURCHASES'}>
                        </Gallery>
                        <Text b size="$xl" css={{marginLeft: "auto"}}>{bottomText}</Text>
                    </Container>}
            </Grid>
        </Grid.Container>
    );
};