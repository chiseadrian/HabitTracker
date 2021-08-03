import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { noteClearActive, noteStartAddNew, noteStartDelete, noteStartUpdate } from '../../actions/note';
import { modalCustomStyle } from '../../static/modalCustomStyle';


Modal.setAppElement('#root');

const initEvent = {
    title: '',
    body: '',
}

export const NoteModal = ({ t }) => {
    const dispatch = useDispatch();
    const { modalNoteOpen } = useSelector(state => state.ui);
    const { activeNote } = useSelector(state => state.note);

    const [formValues, handleInputChange, setFormValues] = useForm(initEvent);
    const { body, title } = formValues;


    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (title === '' || body === '')
            return Swal.fire(t('All fields are required'), '', 'warning');

        (activeNote)
            ? dispatch(noteStartUpdate(formValues))
            : dispatch(noteStartAddNew({ ...formValues, date: new Date().getTime() }));

        closeModal();
    }

    const handleDelete = () => {
        Swal.fire({
            title: t('Are you sure'),
            text: t("You won't be able to revert this"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('Yes, delete it')
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(noteStartDelete(activeNote.id));
            }
        })
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(noteClearActive());
        setFormValues(initEvent);
    }

    useEffect(() => {
        if (activeNote)
            setFormValues(activeNote)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeNote])

    return (
        <Modal
            isOpen={modalNoteOpen}
            onRequestClose={closeModal}
            style={modalCustomStyle}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <div className="modal-title">
                <h2 className="ml-1">{(activeNote) ? t('Edit') : t('Add')} {t('note')}</h2>

                {
                    (activeNote) && (
                        <button className="delete modal-delete" onClick={handleDelete}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    )
                }
            </div>

            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${(title === "") ? 'modal-border-error' : 'modal-border'}`}
                        placeholder={`${t('Title')}...`}
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                </div>
                <br />

                <div className="form-group">
                    <textarea
                        type="text"
                        className={`form-control text-area ${(body === "") ? 'modal-border-error' : 'modal-border'}`}
                        placeholder={`${t('Note')}...`}
                        rows="5"
                        name="body"
                        value={body}
                        onChange={handleInputChange}
                    ></textarea>
                    <br />
                </div>

                <button
                    type="submit"
                    className="modal-save"
                >
                    <i className="far fa-save"></i>
                    <span> {t('Save')} </span>
                </button>
            </form>

        </Modal>
    )
}
