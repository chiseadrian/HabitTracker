import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import { noteClear } from './note';
import { routineClear } from './routine';
import { taskClear } from './task';


export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());  //guarda la hora en la que se ha creado el token porque tiene 2h de vida
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());  //guarda la hora en la que se ha creado el token porque tiene 2h de vida
            Swal.fire(
                'Verify account',
                `We sent an email to ${email} to make sure you own it. Please check your inbox and verify your email`,
                'info'
            );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startGoogleLogin = (email, name, token, type) => {
    return async (dispatch) => {
        const password = ' ';
        const resp = await fetchSinToken('auth/google', { email, name, password, type }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name,
                type: body.type
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startCheckin = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());  //guarda la hora en la que se ha creado el token porque tiene 2h de vida
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkingFinish());
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

const checkingFinish = () => ({
    type: types.authCheckingFinish
})
const login = (user) => ({
    type: types.authLogin,
    payload: user
})
const logout = () => ({
    type: types.authLogout
})