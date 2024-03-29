/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect, useCallback } from 'react';
import {
  GoogleLoginProps,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import loadScript from '../../utils/loadScript';
import removeScript from '../../utils/removeScript';

const useGoogleLogin = ({
  onSuccess = () => {},
  onAutoLoadFinished = () => {},
  onFailure = () => {},
  onRequest = () => {},
  clientId,
  cookiePolicy,
  loginHint,
  hostedDomain,
  autoLoad,
  isSignedIn,
  fetchBasicProfile,
  redirectUri,
  uxMode,
  scope,
  accessType,
  responseType,
  jsSrc = 'https://apis.google.com/js/api.js',
  prompt,
}: Partial<GoogleLoginProps>) => {
  const [loaded, setLoaded] = useState(false);

  const handleSigninSuccess = useCallback(
    res => {
      /*
      offer renamed response keys to names that match use
    */
      const basicProfile = res.getBasicProfile();
      const authResponse = res.getAuthResponse(true);
      res.googleId = basicProfile.getId();
      res.tokenObj = authResponse;
      res.tokenId = authResponse.id_token;
      res.accessToken = authResponse.access_token;
      res.profileObj = {
        googleId: basicProfile.getId(),
        imageUrl: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
        name: basicProfile.getName(),
        givenName: basicProfile.getGivenName(),
        familyName: basicProfile.getFamilyName(),
      };
      onSuccess(res);
    },
    [onSuccess]
  );

  const signIn = useCallback(
    (e?: Event) => {
      if (e) {
        e.preventDefault(); // to prevent submit if used within form
      }
      if (loaded) {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        console.log(GoogleAuth);
        const options = {
          prompt,
        };
        onRequest();
        if (responseType === 'code') {
          GoogleAuth.grantOfflineAccess(options).then(
            (res: GoogleLoginResponseOffline) => onSuccess(res),
            (err: unknown) => onFailure(err)
          );
        } else {
          GoogleAuth.signIn(options).then(
            (res: GoogleLoginResponse) => handleSigninSuccess(res),
            (err: unknown) => onFailure(err)
          );
        }
      }
    },
    [
      handleSigninSuccess,
      loaded,
      onFailure,
      onRequest,
      onSuccess,
      prompt,
      responseType,
    ]
  );

  useEffect(() => {
    let unmounted = false;
    loadScript(
      document,
      'script',
      'google-login',
      jsSrc,
      () => {
        const params = {
          client_id: clientId,
          cookie_policy: cookiePolicy,
          login_hint: loginHint,
          hosted_domain: hostedDomain,
          fetch_basic_profile: fetchBasicProfile,
          ux_mode: uxMode,
          redirect_uri: redirectUri,
          scope,
          access_type: accessType,
        };

        if (responseType === 'code') {
          params.access_type = 'offline';
        }

        window.gapi.load('auth2', () => {
          const GoogleAuth = window.gapi.auth2.getAuthInstance();
          if (!GoogleAuth) {
            window.gapi.auth2.init(params).then(
              (res: {
                isSignedIn: { get: () => boolean };
                currentUser: { get: () => boolean };
              }) => {
                if (!unmounted) {
                  setLoaded(true);
                  const signedIn = !!isSignedIn && res.isSignedIn.get();
                  onAutoLoadFinished(signedIn);
                  if (signedIn) {
                    handleSigninSuccess(res.currentUser.get());
                  }
                }
              },
              (err: unknown) => {
                setLoaded(true);
                onAutoLoadFinished(false);
                onFailure(err);
              }
            );
          } else {
            GoogleAuth.then(
              () => {
                if (unmounted) {
                  return;
                }
                if (isSignedIn && GoogleAuth.isSignedIn.get()) {
                  setLoaded(true);
                  onAutoLoadFinished(true);
                  handleSigninSuccess(GoogleAuth.currentUser.get());
                } else {
                  setLoaded(true);
                  onAutoLoadFinished(false);
                }
              },
              (err: unknown) => {
                onFailure(err);
              }
            );
          }
        });
      },
      err => {
        onFailure(err);
      }
    );

    return () => {
      unmounted = true;
      removeScript(document, 'google-login');
    };
  }, [
    accessType,
    clientId,
    cookiePolicy,
    fetchBasicProfile,
    handleSigninSuccess,
    hostedDomain,
    isSignedIn,
    jsSrc,
    loginHint,
    onAutoLoadFinished,
    onFailure,
    redirectUri,
    responseType,
    scope,
    uxMode,
  ]);

  useEffect(() => {
    if (autoLoad) {
      signIn();
    }
  }, [autoLoad, signIn, loaded]);

  return { signIn, loaded };
};

export default useGoogleLogin;
