import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { noteClearActive, noteStartAddNew, noteStartDelete, noteStartUpdate } from '../../actions/note';


Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
const initEvent = {
    title: '',
    body: '',
}

export const NoteModal = () => {
    const dispatch = useDispatch();
    const { modalNoteOpen } = useSelector(state => state.ui);
    const { activeNote } = useSelector(state => state.note);

    const [formValues, handleInputChange, setFormValues] = useForm(initEvent);
    const { body, title } = formValues;


    useEffect(() => {
        if (activeNote)
            setFormValues(activeNote)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeNote])


    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (title === '' || body === '')
            return Swal.fire('All fields are required !', '', 'warning');

        (activeNote)
            ? dispatch(noteStartUpdate(formValues))
            : dispatch(noteStartAddNew({ ...formValues, date: new Date().getTime() }));

        closeModal();
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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

    return (
        <Modal
            isOpen={modalNoteOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <div className="modal-title">
                <h2 className="ml-1">{(activeNote) ? "Edit" : "New"} note</h2>

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
                        placeholder="Title..."
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
                        placeholder="Note..."
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
                    <span> Save </span>
                </button>
            </form>

        </Modal>
    )
}