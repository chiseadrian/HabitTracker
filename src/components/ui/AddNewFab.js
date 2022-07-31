import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenListModal, uiOpenNoteModal, uiOpenRoutineModal } from '../../actions/ui';
import { taskStartSave } from '../../actions/task';
import { noteStartAddNew, noteStartUpdate } from '../../actions/note';


export const AddNewFab = ({ type, note, t }) => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        switch (type) {
            case 'note':
                dispatch(uiOpenNoteModal());
                break;
            case 'save-note':
                dispatch(noteStartUpdate(note, t));
                break;
            case 'save-new-note':
                dispatch(noteStartAddNew(note, t));
                break;
            case 'routine':
                dispatch(uiOpenRoutineModal());
                break;
            case 'save-task':
                dispatch(taskStartSave(t));
                break;
            case 'list-row':
                dispatch(uiOpenListModal('list-row-add'))
                break;
            default:
                break;
        }
    }

    return (
        <button
            className={type.includes('save') ? 'fab fab-guardar' : 'fab'}
            onClick={handleOnClick}
        >
            {
                (type.includes('save'))
                    ? <div><i className="far fa-save"></i> {t('Save')} </div>
                    : <i className="fas fa-plus"></i>
            }
        </button>
    )
}
