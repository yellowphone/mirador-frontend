import React from 'react';
import GoogleLogin from './GoogleLogin';

export const Login = () => {
    const success = (response: any) => {
        console.log(response)
    }

    const error = (response: any) => {
        console.error(response)
    }

    return <GoogleLogin onSuccess={success} onFailure={error} clientId={process.env.GOOGLE_CLIENT_ID ?? ''} />
}