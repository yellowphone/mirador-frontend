import { Center, Modal, ModalBody, ModalCloseButton, ModalContent, Image, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
// import { FacebookLogin } from './FacebookLogin';
// import GoogleLogin from './GoogleLogin';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Account, getUserContext, setUserContext } from '../../utils/userContext';
import { ILoginDataProps } from './Login.types';

export const Login: FC<ILoginDataProps> = ({
    isOpen,
    onClose,
}) => {
    const googleSuccess = useCallback((res: any) => {
        const { tokenObj, profileObj } = res;
        console.log(res)
        setUserContext(
            profileObj.name,
            profileObj.email,
            tokenObj.id_token,
            profileObj.imageUrl,
            tokenObj.access_token,
            Account.Google,
        );
        console.log(getUserContext())
        onClose();
    }, []);

    const facebookSuccess = useCallback((res: any) => {
        console.log(res);
        setUserContext(
            res.name,
            res.email,
            res.userID,
            res.picture.data.url,
            res.accessToken,
            Account.Facebook,
        );
        console.log(getUserContext())
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