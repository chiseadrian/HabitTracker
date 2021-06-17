import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { uiCloseModal } from '../../actions/ui';
import { modalCustomStyle } from '../../static/modalCustomStyle';
import { startUpdateUser } from '../../actions/auth';


Modal.setAppElement('#root');

const initEvent = {
    name: '',
    email: '',
    newPassword: '',
    newPassword2: ''
}

export const UserEditModal = () => {
    const dispatch = useDispatch();
    const { modalUserEditOpen } = useSelector(state => state.ui);
    const { name: currentName, email: currentEmail } = useSelector(state => state.auth);
    const [formValues, handleInputChange, setFormValues] = useForm(initEvent);
    const { name, email, newPassword2, newPassword } = formValues;


    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (name === '' || email === '')
            return Swal.fire('Name and email are required!', '', 'warning');

        if (newPassword !== '' || newPassword2 !== '') {
            if (newPassword !== newPassword2)
                return Swal.fire("Password don't match!", '', 'warning');

            if (newPassword.length < 6 || newPassword2.length < 6)
                return Swal.fire('The password must be at least 6 characters!', '', 'warning');

            if (/\s/.test(newPassword)) {
                return Swal.fire("Password cannot have spaces!", '', 'warning');
            }
        }

        await updateUser();
    }

    const updateUser = async () => {
        await Swal.fire({
            title: 'Insert your current password: ',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: false,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startUpdateUser({
                    password: result.value,
                    name,
                    email,
                    newPassword
                }));
            }
        });
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
    }


    useEffect(() => {
        setFormValues({
            ...formValues,
            name: currentName,
            email: currentEmail
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Modal
            isOpen={modalUserEditOpen}
            onRequestClose={closeModal}
            style={modalCustomStyle}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <div className="modal-title">
                <h2 className="ml-1"> Edit User </h2>
            </div>

            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> Name: </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className={`form-control ${(name === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder="e.g. Adrian"
                            autoComplete="off"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> Email: </label>
                    <div className="col-sm-9">
                        <input
                            type="email"
                            className={`form-control ${(email === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder="example@example.com"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <hr />

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> New Password: </label>
                    <div className="col-sm-9">
                        <input
                            type="password"
                            className={`form-control ${(newPassword === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder="..."
                            autoComplete="off"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> Repeat password: </label>
                    <div className="col-sm-9">
                        <input
                            type="password"
                            className={`form-control ${(newPassword2 === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder="..."
                            autoComplete="off"
                            name="newPassword2"
                            value={newPassword2}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />

                <button
                    type="submit"
                    className="modal-save"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>
            </form>

        </Modal>
    )
}
