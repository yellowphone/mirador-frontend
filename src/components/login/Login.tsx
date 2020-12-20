import { Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../utils/paths';
import GoogleLogin from './GoogleLogin';
import { ILoginDataProps } from './Login.types';

export const Login: FC<ILoginDataProps> = ({
    isOpen,
    onClose,
}) => {
    const success = useCallback((response: any) => {
        console.log(response);
    }, []);

    const error = useCallback((response: any) => {
        console.error(response);
    }, []);

    return (
          <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Sign in with your favorite account</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Center>
                        <GoogleLogin
                            onSuccess={success}
                            onFailure={error}
                            clientId={process.env.GOOGLE_CLIENT_ID ?? ''}
                        />
                    </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
    );
}