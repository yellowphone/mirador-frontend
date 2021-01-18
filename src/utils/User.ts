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

const initGoogleLogin = () => new Promise(
    resolve => {
        loadScript(
            document,
            'script',
            'google-login',
            'https://apis.google.com/js/api.js',
            async () => googleLogin(resolve),
            err => {
                console.error(err)
            }
        )
    }
);

export const initFacebookSdk = () => {
    console.log('init facebook sdk')
    return new Promise(resolve => {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : process.env.FB_APP_ID,
                cookie     : true,  // enable cookies to allow the server to access the session
                xfbml      : true,  // parse social plugins on this page
                version    : process.env.FB_API_VERSION // use graph api version 2.8
            });
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        resolve('Facebook login init');
    })
}

export const initLogins = () => {
    return initGoogleLogin().then(() => {
        initFacebookSdk().then(() => {
            console.log(
                'everything is initialized'
            )
        })
    });
};

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