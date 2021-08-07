import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { startGoogleLogin } from '../../actions/auth';


export const GoogleLoginButton = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        try {
            dispatch(startGoogleLogin(response.tokenId, t));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText={t('Login')}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
