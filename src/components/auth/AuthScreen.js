import React from 'react';

import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { GoogleLoginButton } from './GoogleLoginButton';


export const AuthScreen = () => {
    return (
        <div className="login-container fill-parent">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-5 login-form">
                    <h3>Login</h3>
                    <LoginForm />

                    <GoogleLoginButton />
                </div>

                <div className="col-md-5 register-form">
                    <h3>Create Account</h3>
                    <RegisterForm />
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    )
}