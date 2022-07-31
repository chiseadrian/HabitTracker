import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { noteStartDelete } from '../../actions/note';
import { AddNewFab } from '../ui/AddNewFab';

const initEvent = {
    title: '',
    body: '',
}

export const NoteContent = ({ t }) => {
    const dispatch = useDispatch();
    const { activeNote } = useSelector(state => state.note);

    const [formValues, handleInputChange, setFormValues] = useForm(initEvent);
    const { body, title } = formValues;


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
                dispatch(noteStartDelete(activeNote.id, t));
            }
        })
    }

    const newNote = () => {
        return (activeNote === null && body !== '' && title !== '');
    }

    const hasChanged = () => {
        if (activeNote)
            return (body !== activeNote.body) || (title !== activeNote.title);

        return false;
    }

    useEffect(() => {
        if (activeNote) setFormValues(activeNote);
        else setFormValues(initEvent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeNote]);

    return (
        <div className="note-content content-scroll-y">
            <div className='flex'>
                <input value={title} onChange={handleInputChange} name="title" placeholder='Title...' />
                <i className="fas fa-trash-alt delete-icon" onClick={handleDelete}></i>
            </div>
            <textarea value={body} onChange={handleInputChange} name="body" placeholder='Note...' />

            {hasChanged() && <AddNewFab type="save-note" note={formValues} t={t} />}
            {newNote() && <AddNewFab type="save-new-note" note={formValues} t={t} />}
        </div>
    )
}
