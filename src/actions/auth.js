import Swal from 'sweetalert2';
import i18next from 'i18next';

import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import { noteClear } from './note';
import { routineClear } from './routine';
import { taskClear } from './task';
import { uiCloseModal } from './ui';


export const startLogin = (email, password, t) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        auxLogin(dispatch, body, t);
    }
}

export const startGoogleLogin = (id_token, t) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/google', { id_token }, 'POST');
        const body = await resp.json();

        auxLogin(dispatch, body, t);
    }
}

export const startRegister = (email, password, name, t) => {
    return async () => {
        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            saveTokenInLocalStorage(body.token);
            Swal.fire(
                t('Verify account'),
                `${t('We sent an email to')} ${email} ${t('to make sure you own it. Please check your inbox and verify your email')}`,
                'info'
            );
        } else {
            Swal.fire('Error', t(body.msg), 'error');
        }
    }
}

export const startCheckin = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            saveTokenInLocalStorage(body.token);
            dispatch(login({
                uid: body.uid,
                name: body.name,
                email: body.email,
                language: body.language
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

export const startUpdateUser = (newUserData, t) => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/updateUser', newUserData, 'POST');
        const body = await resp.json();

        if (body.ok) {
            const { user } = body;
            dispatch(login({
                uid: user.uid,
                name: user.name,
                email: user.email,
                language: user.language
            }));
            dispatch(uiCloseModal());
            Swal.fire({
                icon: 'success',
                title: t('Updated profile'),
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire('Error', t(body.msg), 'error');
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch(noteClear());
        dispatch(routineClear());
        dispatch(taskClear());
        dispatch(logout());
    }
}

const auxLogin = (dispatch, body, t) => {
    const { ok, token, uid, name, email, msg } = body;

    if (ok) {
        saveTokenInLocalStorage(token);
        i18next.changeLanguage(body.language);  //asinga el idioma cuando hacemos login
        dispatch(login({
            uid: uid,
            name: name,
            email,
            language: body.language
        }));
    } else {
        Swal.fire('Error', t(msg), 'error');
    }
}
const saveTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('token-init-date', new Date().getTime());  //guarda la hora en la que se ha creado el token porque tiene 2h de vida
}

export const login = (user) => ({ type: types.authLogin, payload: user });
export const logout = () => ({ type: types.authLogout });
export const checkingFinish = () => ({ type: types.authCheckingFinish });