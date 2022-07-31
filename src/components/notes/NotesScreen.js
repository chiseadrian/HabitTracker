import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { noteSetActive, noteStartLoading } from '../../actions/note';
import { Note } from './Note';
import { NoteContent } from './NoteContent';
import { MainTopBar } from '../ui/MainTopBar';


export const NotesScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { notes, activeNote } = useSelector(state => state.note);


    const handleAddNote = () => {
        dispatch(noteSetActive(null));
    }

    useEffect(() => {
        dispatch(noteStartLoading());
    }, [dispatch]);

    return (
        <div className="fill-parent">
            <MainTopBar title={'Notes'} t={t} />

            <div className="fill-parent flex">
                <div className="note-sidebar content-scroll-y ">
                    {notes.map((note) =>
                        <Note key={note.id} {...note} />
                    )}

                    <div className={`add-note ${(activeNote === null) ? 'note-active' : 'note-not-active'}`} onClick={handleAddNote}>
                        <i className="fas fa-plus-circle"></i>
                    </div >
                </div>

                <NoteContent note={activeNote} t={t} />
            </div>
        </div >
    )
}
