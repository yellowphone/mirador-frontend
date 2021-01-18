import { Center, Modal, ModalBody, ModalCloseButton, ModalContent, Image, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
// import { FacebookLogin } from './FacebookLogin';
// import GoogleLogin from './GoogleLogin';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { ILoginDataProps } from './Login.types';

export const Login: FC<ILoginDataProps> = ({
    isOpen,
    onClose,
}) => {
    const googleSuccess = useCallback((response: any) => {
        console.log(response);
        onClose();
    }, []);

    const facebookSuccess = useCallback((response: any) => {
        console.log(response);
        onClose();
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
                            onSuccess={googleSuccess}
                            onFailure={error}
                            clientId={process.env.GOOGLE_CLIENT_ID ?? ''}
                        />
                    </Center>
                    <br />
                    <Center>
                        <FacebookLogin
                            appId={process.env.FB_APP_ID ?? ''}
                            // autoLoad
                            callback={facebookSuccess}
                            fields='name,email,picture'
                        />
                    </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
    );
}