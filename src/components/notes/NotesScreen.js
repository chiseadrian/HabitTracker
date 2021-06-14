import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { noteStartLoading } from '../../actions/note';
import { AddNewFab } from '../ui/AddNewFab';
import { Note } from './Note';
import { NoteModal } from './NoteModal';
import { MainTopBar } from '../ui/MainTopBar';
import { uiOpenNoteModal } from '../../actions/ui';


export const NotesScreen = () => {
    const dispatch = useDispatch();
    const { notes } = useSelector(state => state.note)


    const handleAddNote = () => {
        dispatch(uiOpenNoteModal());
    }

    useEffect(() => {
        dispatch(noteStartLoading());
    }, [dispatch]);

    return (
        <div className="fill-parent">
            <MainTopBar title={'Notes'} />

            <div className="content-scroll-y">
                {
                    (notes.length === 0) && (
                        <div className="pointer-message" onClick={handleAddNote}> Add note </div>
                    )
                }
                <ul className="notes">
                    {
                        notes.map((note) => {
                            return (
                                <Note
                                    key={note.id}
                                    {...note}
                                />
                            )
                        })
                    }
                </ul>

                <AddNewFab type="note" />

                <NoteModal />
            </div>
        </div>
    )
}
