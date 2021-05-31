import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';

import { startGoogleLogin } from '../../actions/auth';


export const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        try {
            dispatch(startGoogleLogin(
                response.profileObj.email,
                response.profileObj.givenName,
                response.tokenObj.access_token,
                'google'
            ));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GoogleLogin
            clientId="1097290771375-c4khkbo5keq9eurkqo37sohsj6rgfift.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
