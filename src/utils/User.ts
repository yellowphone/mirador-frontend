import { createContext, useContext } from "react";
import loadScript from "./loadScript";

export interface IGoogleProfile {
    email: string;
    lastName: string;
    firstName: string;
    googleId: string;
    imageUrl: string;
    fullName: string;
}

export interface IFacebookProfile {
    // will add when facebook login is setup
}

export type LoginContext = IGoogleProfile | IFacebookProfile | undefined;

let loginContext: LoginContext = undefined;

export const initLoginContext = () => {
    loadScript(
        document,
        'script',
        'google-login',
        'https://apis.google.com/js/api.js',
        googleLogin,
        err => {
            console.error(err)
        }
    );
}

const googleLogin = () => {
    window.gapi.load('auth2', () => {
        const params = {
            client_id: process.env.GOOGLE_CLIENT_ID,
        };

        window.gapi.auth2.init(params).then(
            (res: { isSignedIn: { get: () => any; }; currentUser: { get: () => any; }; }) => {
                const signedIn = res.isSignedIn.get()
                if (signedIn) {
                    const googleProfile = res.currentUser.get().getBasicProfile();
                    setLoginContext({
                        email: googleProfile.getEmail(),
                        lastName: googleProfile.getFamilyName(),
                        firstName: googleProfile.getGivenName(),
                        googleId: googleProfile.getId(),
                        imageUrl: googleProfile.getImageUrl(),
                        fullName: googleProfile.getName(),
                    });
                }
            },
            (err: any) => {
                setIsUserLoggedIn(false);
                console.error(err);
            }
        )
    });
};

export const setLoginContext = (profileObj: IGoogleProfile) => loginContext = profileObj;

export const getLoginContext = (): LoginContext => useContext(createContext(loginContext));

export const setIsUserLoggedIn = (isLoggedIn: boolean) => isUserLoggedIn = isLoggedIn;

export let isUserLoggedIn: boolean = false;