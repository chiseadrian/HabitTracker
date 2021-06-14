import React from 'react';
import { useDispatch } from 'react-redux';

import { noteSetActive } from '../../actions/note';
import { uiOpenNoteModal } from '../../actions/ui';


export const Note = (note) => {
    const dispatch = useDispatch();
    const { title, body } = note;

    const handleNote = () => {
        dispatch(noteSetActive(note));
        dispatch(uiOpenNoteModal());
    }


    return (
        <li
            className="note"
            onClick={handleNote}
        >
            <div className="note-card pointer">
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        </li>
    )
}
