import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { GoogleLoginButton } from './GoogleLoginButton';


export const AuthScreen = () => {
    const { t } = useTranslation();

    return (
        <div className="login-container fill-parent">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-5 login-form">
                    <h3>{t('Login')}</h3>
                    <LoginForm />

                    <GoogleLoginButton />
                </div>

                <div className="col-md-5 register-form">
                    <h3>{t('Create Account')}</h3>
                    <RegisterForm />
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    )
}