import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
// import { GoogleLoginButton } from './GoogleLoginButton';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formLoginValues, handleLoginInputChange] = useForm({ lEmail: '', lPassword: '' });
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rNombre: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
    });
    const { lEmail, lPassword } = formLoginValues;
    const { rEmail, rPassword1, rPassword2, rNombre } = formRegisterValues;


    const handleLogin = async (e) => {
        e.preventDefault();
        await setLoading(true);

        if (lEmail === '' || lPassword === '') {
            Swal.fire('Fill all fields to login!', '', 'warning');
        } else {
            dispatch(startLogin(lEmail.trim(), lPassword));
        }

        setLoading(false);
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        await setLoading(true);

        if (rEmail === '' || rPassword1 === '' || rPassword2 === '' || rNombre === '') {
            Swal.fire('Fill all fields to register!', '', 'warning');
        } else if (rPassword1 !== rPassword2) {
            Swal.fire('Passwords have to match!', '', 'warning');
        } else {
            dispatch(startRegister(rEmail.trim(), rPassword1, rNombre));
        }

        setLoading(false);
    }


    return (
        <div className="login-container fill-parent">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-5 login-form">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin} >
                        <fieldset disabled={loading}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control login-input"
                                    placeholder="Email"
                                    name="lEmail"
                                    value={lEmail}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control login-input"
                                    placeholder="Password"
                                    name="lPassword"
                                    value={lPassword}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login"
                                />
                            </div>
                        </fieldset>
                    </form>

                    {/* <GoogleLoginButton /> */}
                </div>

                <div className="col-md-5 register-form">
                    <h3>Create Account</h3>
                    <form onSubmit={handleRegister}>
                        <fieldset disabled={loading}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control register-input"
                                    placeholder="Name"
                                    name="rNombre"
                                    value={rNombre}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control register-input"
                                    placeholder="Email"
                                    name="rEmail"
                                    value={rEmail}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control register-input"
                                    placeholder="Password"
                                    name="rPassword1"
                                    value={rPassword1}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control register-input"
                                    placeholder="Repeat password"
                                    name="rPassword2"
                                    value={rPassword2}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Create account" />
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    )
}