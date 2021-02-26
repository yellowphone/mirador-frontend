import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, } from '@chakra-ui/react';
import React, { FC, useCallback, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { CREATE_USER } from '../../graphql/mutations/userMutation';
import { Account, getUserContext, IUserContext, setUserContext, } from '../../utils/userContext';
import { ILoginDataProps } from './Login.types';
import { useLazyQuery } from '@apollo/client';
import { FIND_USER_BY_EMAIL } from '../../graphql/queries/userQuery';
import { useCookies } from 'react-cookie';

export const Login: FC<ILoginDataProps> = ({
    isOpen,
    onClose,
    setUser
}) => {

    const [cookie, setCookie] = useCookies(['user'])

    const [ incomingUser, setIncomingUser ] = useState<IUserContext>();

    const [ createUser, { data: userLoginData, error: mutationError }] = useMutation(CREATE_USER);

    const [ findUserByEmail ] = useLazyQuery(FIND_USER_BY_EMAIL, {
        onCompleted: (data) => {
            console.log(data.findUserByEmail)
            if (data.findUserByEmail) {
                setCookie('user', data.findUserByEmail, { path: '/'})
                setUserContext(data.findUserByEmail)
                setUser(data.findUserByEmail)
            }
        },
        onError: (e: ApolloError) => {
            if (e.message == "Cannot return null for non-nullable field Query.findUserByEmail.") {
                console.log("No user found from DB")
                console.log("Creating user...")
                incomingUser && createUser({
                    variables: {
                        email: incomingUser.email,
                        firstname: incomingUser.firstname,
                        lastname: incomingUser.lastname,
                        access_token: incomingUser.access_token,
                        user_id: incomingUser.user_id,
                        image_url: incomingUser.image_url,
                        account_type: 'GOOGLE',
                    }
                }).then(() => {
                    setCookie('user', incomingUser, { path: '/'})
                    setUserContext(incomingUser)
                    setUser(incomingUser);
                })
            }
            else {
                console.error(e)
            }
        }
    });

    cookie.user && setUserContext(cookie.user)
    mutationError && console.log(mutationError)

    const googleSuccess = useCallback( (res: any) => {
        const func = async () => {
            const { tokenObj, profileObj } = res;
            const user: IUserContext = {
                fullname: profileObj.name,
                email: profileObj.email,
                firstname: profileObj.name.split(' ')[0],
                lastname: profileObj.name.split(' ')[1],
                user_id: tokenObj.id_token,
                image_url: profileObj.imageUrl,
                access_token: tokenObj.access_token,
                accountType: Account.Google,
            };

            setIncomingUser(user)

            findUserByEmail({
                variables: {
                    email: user.email
                }
            })

            onClose();
        }

        func();
    }, [getUserContext, onClose]);

    const facebookSuccess = useCallback((res: any) => {
        const func = async () => {
            const user: IUserContext = {
                fullname: res.name,
                email: res.email,
                firstname: res.name.split(' ')[0],
                lastname: res.name.split(' ')[1],
                user_id: res.userID,
                image_url: res.picture.data.url,
                access_token: res.accessToken,
                accountType: Account.Facebook,
            };

            await createUser({
                variables: {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    access_token: user.access_token,
                    user_id: user.user_id,
                    image_url: user.image_url,
                    account_type: 'FACEBOOK',
                }
            });

            onClose();
        }

        func();
    }, [getUserContext, onClose]);
    
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
                    {/* <Center>
                        <FacebookLogin
                            appId={process.env.FB_APP_ID ?? ''}
                            // autoLoad
                            callback={facebookSuccess}
                            onFailure={error}
                            fields='name,email,picture'
                        />
                    </Center> */}
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
    );
}