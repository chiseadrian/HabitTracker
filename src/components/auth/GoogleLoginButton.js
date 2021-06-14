import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';

import { startGoogleLogin } from '../../actions/auth';


export const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        try {
            dispatch(startGoogleLogin(response.tokenId));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
