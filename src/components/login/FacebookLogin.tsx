import React, { FC } from 'react';

export const FacebookLogin: FC =() => {
    console.log('here is the facebook login')
    
    return (
        <div 
            className="fb-login-button"
            data-width=""
            data-size="large"
            data-button-type="continue_with"
            data-layout="default"
            data-auto-logout-link="false"
            data-use-continue-as="false"
        >
            {/* <h1>Facebook login</h1> */}
        </div>
    );
};