import React, { FormEvent, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
  } from "@chakra-ui/react"
import { useHistory } from 'react-router-dom';
import { NavigationBar } from "../navigation-bar/NavigationBar";
import { Paths } from "../../../utils/paths";

export const NoLogin = () => {

    const history = useHistory();

    return (
        <>
            <NavigationBar />
            <Modal isOpen={true} onClose={() => ({})} >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Uh no!</ModalHeader>
                <ModalBody>
                    <Text p={3}>You're not logged in!</Text>
                    <Button p={3} size="sm" onClick={() => history.push(Paths.Home)}>Click here to go home</Button>
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
    
}