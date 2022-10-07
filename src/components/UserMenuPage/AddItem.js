import React, {useState} from "react";
import {Button, Card, Container, Grid, Input, Spacer} from "@nextui-org/react";
import {toast} from "react-toastify";
import {getFutureDate, required} from "../../services/validation/validator";
import {LeftNavTab} from "./LeftNavTab";
import {RequireAuth, useAccessManager} from "../../services/authorization.service";
import {validateLotInputStringLength, validateLotPrice} from "../../services/validation/lotValidator";
import {addItem} from "../../services/item.service";
import {useNavigate} from "react-router-dom";

const AddNewItem = () => {
    let {user} = useAccessManager();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [startingPrice, setStartingPrice] = useState();
    const [startSaleDate, setStartSaleDate] = useState();
    const [endSaleDate, setEndSaleDate] = useState();
    const [itemCategories, setItemCategories] = useState();
    const [itemPhotos, setItemPhotos] = useState();
    const [description, setDescription] = useState("");

    const [nameError, setNameError] = useState("");
    const [createdByError, setlCreatedByError] = useState("");
    const [startingPriceError, setStartingPriceError] = useState("");
    const [startSaleDateError, setStartSaleDateError] = useState("");
    const [endSaleDateError, setEndSaleDateError] = useState("");
    const [itemPhotosError, setItemPhotosError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const hasErrors = !!(nameError || createdByError || startingPriceError || startSaleDateError
        || endSaleDateError || itemPhotosError || descriptionError);

    const handleSave = (e) => {
        e.preventDefault();
        if (!hasErrors) {
            let addItemFormData = new FormData();
            addItemFormData.append('Name', name);
            addItemFormData.append('CreatedBy', createdBy);
            addItemFormData.append('OwnerId', user.id);
            addItemFormData.append('StartingPrice', startingPrice);
            addItemFormData.append('StartSaleDate', startSaleDate);
            addItemFormData.append('EndSaleDate', endSaleDate);
            addItemFormData.append('ItemFormFilePhotos', itemPhotos);

            addItem(addItemFormData)
                .then((resp) => {
                        navigate("/auction/" + resp.id)
                    },
                    (error) => {
                        console.error({error});
                        toast(error.message);
                    }
                );
        }
    };

    let minStartSaleDate = getFutureDate(1);
    let minEndSaleDate = getFutureDate(2);
    let maxDate = getFutureDate(180);

    const validateName = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validateLotInputStringLength(input);
        setNameError(errorMessage);
    }
    const validateCreatedBy = (e) => {
        let input = e.target.value;
        const errorMessage = required(e.target.value) || validateLotInputStringLength(input);
        setlCreatedByError(errorMessage);
    }
    const validatePrice = (e) => {
        let input = e.target.value;
        const errorMessage = required(input) || validateLotPrice(input);
        setStartingPriceError(errorMessage);
    }
    const validateStartSaleDate = (e) => {
        let input = e.target.value;
        const errorMessage = required(input);
        setStartSaleDateError(errorMessage);
    };
    const validateEndSaleDate = (e) => {
        let input = e.target.value;
        const errorMessage = required(input);
        setEndSaleDateError(errorMessage);
    };
    const validatePhotos = (e) => {
        let input = e.target.value;
        const errorMessage = required(input);
        setItemPhotosError(errorMessage);
    };

    let inputStyleCss = {width: "100%", minWidth: "240px"};
    return (
        <Grid.Container gap={1} justify="left">
            <Grid md={3} sm={4} xs={0} css={{paddingLeft: "2%", paddingTop: "30px", backgroundColor: '#2d3e4e'}}>
                <LeftNavTab></LeftNavTab>
            </Grid>
            <Grid md={6} sm={8} xs={12} css={{paddingLeft: "2%"}}>
                {user &&
                    <Container css={{
                        margin: 'auto',
                        paddingTop: '3%',
                        minHeight: "740px"
                    }}>
                        <h3>Add Item</h3>
                        <Card.Divider css={{width: '100%'}}/>
                        <Spacer y={1.2}/>
                        <form onSubmit={handleSave} >
                            <Input css={inputStyleCss}
                                   onBlur={validateName}
                                   size="lg"
                                   shadow={true}
                                   helperColor={nameError ? "error" : "success"}
                                   helperText={nameError}
                                   label="Name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   placeholder="Mary Cassatt at the Louvre: The Paintings"
                            />
                            <Spacer y={1.2}/>
                            <Input css={inputStyleCss}
                                   onBlur={validateCreatedBy}
                                   size="lg"
                                   shadow={true}
                                   helperColor={createdByError ? "error" : "success"}
                                   helperText={createdByError}
                                   label="Creator &nbsp;|&nbsp; Brand &nbsp;|&nbsp; Country and Year of Origin"
                                   value={createdBy}
                                   onChange={(e) => setCreatedBy(e.target.value)}
                                   placeholder="Edgar Degas"
                            />
                            <Spacer y={1.2}/>
                            <Input css={inputStyleCss}
                                   onChange={(e) => setStartingPrice(e.target.value)}
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
                                   onChange={(e) => setStartSaleDate(e.target.value)}
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
                                   onChange={(e) => setEndSaleDate(e.target.value)}
                            />
                            <Spacer y={1.2}/>
                            <Input css={inputStyleCss}
                                   label="Upload Item Photo"
                                   onBlur={validatePhotos}
                                   type="file"
                                   name="file"
                                   size="lg"
                                   accept="image/*"
                                   onChange={(e) => setItemPhotos(e.target.files[0])}/>
                            <Spacer y={1.2}/>
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