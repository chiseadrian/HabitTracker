import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { noteSetActive } from '../../actions/note';


export const Note = (note) => {
    const dispatch = useDispatch();
    const { activeNote } = useSelector(state => state.note);
    const { title } = note;

    const handleNote = () => {
        dispatch(noteSetActive(note));
    }

    const isTheCurrentNote = () => {
        if (activeNote)
            return activeNote.id === note.id;

        return false;
    }


    return (
        <div className={isTheCurrentNote() ? 'note-active' : 'note-not-active'} onClick={handleNote}>
            {title}
        </div >
    )
}
