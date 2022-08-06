import React, {useEffect, useState} from "react";
import {Button, Card, Container, Grid, Input, Spacer} from "@nextui-org/react";
import {updatePersonalInfo} from "../../services/user.service";
import {toast} from "react-toastify";
import {getFutureDate, required} from "../../services/validation/validator";
import AuthenticationService from "../../services/authentication.service";
import {LeftNavTab} from "./LeftNavTab";
import {RequireAuth} from "../../services/authorization.service";
import {validateLotInputStringLength, validateLotPrice} from "../../services/validation/lotValidator";

const AddNewItem = () => {
    const [name, setName] = useState("");
    const [ownerId, setOwnerId] = useState();
    const [createdBy, setCreatedBy] = useState("");
    const [startingPrice, setStartingPrice] = useState();
    const [startSaleDate, setStartSaleDate] = useState();
    const [endSaleDate, setEndSaleDate] = useState();
    const [itemCategories, setItemCategories] = useState();
    const [itemFormFilePhotos, setItemFormFilePhotos] = useState();
    const [description, setDescription] = useState("");

    const [nameError, setNameError] = useState("");
    const [createdByError, setlCreatedByError] = useState("");
    const [startingPriceError, setStartingPriceError] = useState("");
    const [startSaleDateError, setStartSaleDateError] = useState("");
    const [endSaleDateError, setEndSaleDateError] = useState("");
    const [itemFormFilePhotosError, setItemFormFilePhotosError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const hasErrors = !!(nameError || createdByError || startingPriceError || startSaleDateError
        || endSaleDateError || itemFormFilePhotosError || descriptionError);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            updatePersonalInfo(name, createdBy, ownerId, startingPrice, startSaleDate,
                endSaleDate, itemCategories, itemFormFilePhotos, description)
                .then(response =>
                    (error) => {
                        console.log({error});
                        toast(error.message);
                    }
                );
        }
    };

    let minStartSaleDate = getFutureDate(0);
    let minEndSaleDate = getFutureDate(1);
    let maxDate = getFutureDate(180);

    useEffect(() => {
        AuthenticationService.getCurrentUser()
            .then(userData => {
                setOwnerId(userData.id)
            });
    }, []);

    const onChangeName = (e) => {
        const input = e.target.value;
        setName(input);
    };

    const onStartSaleDate = (e) => {
        const input = e.target.value;
        setStartSaleDate(input);
    };

    const onEndSaleDate = (e) => {
        const input = e.target.value;
        setEndSaleDate(input);
    };

    const onChangePrice= (e) => {
        const input = e.target.value;
        setStartingPrice(input);
    };

    const validateName = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validateLotInputStringLength(input);
        setNameError(errorMessage);
    }

    const validatePrice = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validateLotPrice(input);
        setStartingPriceError(errorMessage);
    }

    const validateStartSaleDate = (e) => {
        let input = e.target.value;
        const errorMessage = required(input);
        setStartSaleDate(errorMessage);
    };
    const validateEndSaleDate = (e) => {
        let input = e.target.value;
        const errorMessage = required(input);
        setStartSaleDate(errorMessage);
    };

    let inputStyleCss = {width: "100%", minWidth: "240px"};
    return (
        <Grid.Container gap={1} justify="left">
            <Grid md={3} sm={4} xs={0} css={{paddingLeft: "2%", paddingTop: "30px", backgroundColor: '#2d3e4e'}}>
                <LeftNavTab></LeftNavTab>
            </Grid>
            <Grid md={6} sm={8} xs={12} css={{paddingLeft: "2%"}}>
                {ownerId &&
                    <Container css={{
                        margin: 'auto',
                        paddingTop: '3%',
                        minHeight: "740px"
                    }}>
                        <h3>Add Item</h3>
                        <Card.Divider css={{width: '100%'}}/>
                        <Spacer y={1.2}/>
                        <form onSubmit={handleUpdate}>
                            <Input css={inputStyleCss}
                                   onBlur={validateName}
                                   size="lg"
                                   shadow={true}
                                   helperColor={nameError ? "error" : "success"}
                                   helperText={nameError}
                                   label="Name"
                                   value={name}
                                   onChange={onChangeName}
                                   placeholder="Mary Cassatt at the Louvre: The Paintings"
                            />
                            <Spacer y={1.2}/>
                            <Input css={inputStyleCss}
                                   onBlur={validateName}
                                   size="lg"
                                   shadow={true}
                                   helperColor={createdByError ? "error" : "success"}
                                   helperText={createdByError}
                                   label="Creator &nbsp;|&nbsp; Brand &nbsp;|&nbsp; Country and Year of Origin"
                                   value={name}
                                   onChange={onChangeName}
                                   placeholder="Edgar Degas"
                            />
                            <Spacer y={1.2}/>
                            <Input css={inputStyleCss}
                                onChange={onChangePrice}
                                onBlur={validatePrice}
                                type="number"
                                label='Starting Price'
                                labelLeft="$"
                                size="lg"
                                placeholder="11.11"
                                helperColor={startingPriceError ? "error" : "success"}
                                helperText={startingPriceError}
                            />
                            <Spacer y={1.2}/>
                            <Input css={inputStyleCss}
                                   type="date"
                                   min={minStartSaleDate}
                                   max={maxDate}
                                   onBlur={validateStartSaleDate}
                                   size="lg"
                                   shadow={true}
                                   label="Start Date of Sale"
                                   value={startSaleDate}
                                   onChange={onStartSaleDate}
                            />
                            <Spacer y={1.2}/>
                            <Input css={inputStyleCss}
                                   type="date"
                                   min={minEndSaleDate}
                                   max={maxDate}
                                   onBlur={validateEndSaleDate}
                                   size="lg"
                                   shadow={true}
                                   label="End Date of Sale"
                                   value={endSaleDate}
                                   onChange={onEndSaleDate}
                            />
                            <Spacer y={1.7}/>
                            <Button type="submit" aria-label='Save'
                                    css={{width: "100%", minWidth: "240px", zIndex: '0'}}>
                                Save
                            </Button>
                        </form>
                    </Container>}
            </Grid>
            <Grid md={3}>
            </Grid>
        </Grid.Container>
    );
};

export const AddItem = () => {
    return (
        <RequireAuth roles={["User", "Admin"]}>
            <AddNewItem></AddNewItem>
        </RequireAuth>
    );
};