import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';

const initLogin = {
    email: '',
    password: ''
}

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, handleInputChange] = useForm(initLogin);
    const { email, password } = formValues;


    const handleLogin = async (e) => {
        e.preventDefault();
        await setLoading(true);

        (email === '' || password === '')
            ? Swal.fire('Fill all fields to login!', '', 'warning')
            : dispatch(startLogin(email.trim(), password));

        setLoading(false);
    }

    return (
        <form onSubmit={handleLogin} >
            <fieldset disabled={loading}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control login-input"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control login-input"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
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
    )
}
