import React, {useState} from "react";
import {Button, Input, Modal, Text} from "@nextui-org/react";
import {updateBid} from "../services/item.service";
import {toast} from "react-toastify";
import {useAccessManager} from "../services/authorization.service";
import {useNavigate} from "react-router-dom";
import {required, validateNumGreaterThan} from "../services/validator";
import {queryClient} from "../App";


export const ModalPlaceBid = ({item}) => {
    const [bid, setBid] = useState(item.currentBid);
    const [buyer, setBuyer] = useState(item.buyerId);
    const [visible, setVisible] = useState(false);
    const [inputError, setInputError] = useState("");
    const navigate = useNavigate();

    let user = useAccessManager();
    const handler = () => {
        if (!user)
            return navigate("/login");

        setVisible(true);
    }

    const handleUpdateBid = (e) => {
        e.preventDefault();
        if (!inputError) {
            updateBid(item.id, parseInt(bid), buyer)
                .then(response => {
                        queryClient.invalidateQueries('auctionsData')
                        setBid(response.currentBid)
                        setBuyer(response.buyerId)
                    },
                    (error) => {
                        toast(error.message);
                    }
                );
        }
        closeHandler();
    };

    const closeHandler = () => {
        setVisible(false);
    };

    const onChangeInput = (e) => {
        setBid(e.target.value)
        setBuyer(user.id)
    }

    const validateInput = (e) => {
        let input = e.target.value;
        const errorMessage = required(input)
            || validateNumGreaterThan(
                input,
                item.startingPrice > item.currentBid ? item.startingPrice : item.currentBid);

        setInputError(errorMessage);
    }

    return (
        <div>
            <Button onClick={handler}
                    size="lg">
                PLACE BID
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text b transform='uppercase' size={18}>
                        Enter your bid
                    </Text>
                </Modal.Header>
                <form onSubmit={handleUpdateBid}>
                    <Modal.Body css={{minHeight:"100px"}}>
                        <Input
                            onChange={onChangeInput}
                            onBlur={validateInput}
                            type="number"
                            aria-label='Your Bid'
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Your Bid"
                            helperColor={inputError ? "error" : "success"}
                            helperText={inputError}
                            step='5'
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto ghost color='neutral' onClick={closeHandler}>
                            Close
                        </Button>
                        <Button auto
                                type="submit">
                            Place Bid
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
};