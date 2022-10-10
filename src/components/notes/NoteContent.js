import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import hljs from 'highlight.js';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css';

import { useForm } from '../../hooks/useForm';
import { noteStartDelete } from '../../actions/note';
import { AddNewFab } from '../ui/AddNewFab';
import { useState } from 'react';

const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: [
        [{ 'font': [] }, { size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'code-block'],
        ['clean']
    ]
}

const initEvent = {
    title: '',
    body: '',
}

export const NoteContent = ({ t }) => {
    const dispatch = useDispatch();
    const { activeNote } = useSelector(state => state.note);

    const [formValues, handleInputChange, setFormValues] = useForm(initEvent);
    const { title } = formValues;
    const [body, setBody] = useState('');


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
        if (activeNote) {
            setFormValues(activeNote);
            setBody(activeNote.body);
        }
        else {
            setFormValues(initEvent);
            setBody('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeNote]);


    return (
        <div className="note-content content-scroll-y">
            <div className='flex'>
                <input value={title} name="title" onChange={handleInputChange} placeholder='Title...' />
                <i className="fas fa-trash-alt delete-icon" onClick={handleDelete}></i>
            </div>

            <ReactQuill
                theme="snow"
                value={body}
                modules={modules}
                onChange={setBody}
                placeholder='Note...'
            />;

            {hasChanged() && <AddNewFab type="save-note" note={{ ...formValues, body }} t={t} />}
            {newNote() && <AddNewFab type="save-new-note" note={{ ...formValues, body }} t={t} />}
        </div >
    )
}
