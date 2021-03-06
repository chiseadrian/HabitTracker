import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

const initRegister = {
    name: '',
    email: '',
    password1: '',
    password2: '',
}

export const RegisterForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, handleInputChange] = useForm(initRegister);
    const { email, password1, password2, name } = formValues;

    const handleRegister = async (e) => {
        e.preventDefault();
        await setLoading(true);

        if (email === '' || password1 === '' || password2 === '' || name === '') {
            Swal.fire(t('All fields are required'), '', 'warning');
        } else if (password1 !== password2) {
            Swal.fire('Passwords have to match', '', 'warning');
        } else {
            dispatch(startRegister(email.trim(), password1, name, t));
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleRegister}>
            <fieldset disabled={loading}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control register-input"
                        placeholder={t('Name')}
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control register-input"
                        placeholder={t('Email')}
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control register-input"
                        placeholder={t('Password')}
                        name="password1"
                        value={password1}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control register-input"
                        placeholder={t('Repeat Password')}
                        name="password2"
                        value={password2}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        className="btnSubmit"
                        value={t('Create Account')} />
                </div>
            </fieldset>
        </form>
    )
}
