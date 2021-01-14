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

export const initLoginContext = () => new Promise(
    resolve => loadScript(
        document,
        'script',
        'google-login',
        'https://apis.google.com/js/api.js',
        async () => googleLogin(resolve),
        err => {
            console.error(err)
        }
    )
);

const googleLogin = (resolve: any) => {
    window.gapi.load('auth2', () => {
        const params = {
            client_id: process.env.GOOGLE_CLIENT_ID,
        };

        window.gapi.auth2.init(params).then(
            (res: { isSignedIn: { get: () => any; }; currentUser: { get: () => any; }; }) => {
                const signedIn = res.isSignedIn.get();

                if (signedIn) {
                    const googleProfile = res.currentUser.get().getBasicProfile();
                    const user = {
                        email: googleProfile.getEmail(),
                        lastName: googleProfile.getFamilyName(),
                        firstName: googleProfile.getGivenName(),
                        googleId: googleProfile.getId(),
                        imageUrl: googleProfile.getImageUrl(),
                        fullName: googleProfile.getName(),
                    };

                    setLoginContext(user);
                    resolve(user)
                } else {
                    setLoginContext(undefined);
                    resolve(undefined)
                }
            },
            (err: any) => {
                setIsUserLoggedIn(false);
                console.error(err);
            }
        )
    });
};

export const setLoginContext = (profileObj?: IGoogleProfile) => loginContext = profileObj;

export const getLoginContext = (): LoginContext => loginContext;

export const setIsUserLoggedIn = (isLoggedIn: boolean) => isUserLoggedIn = isLoggedIn;

export let isUserLoggedIn: boolean = false;