import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenListModal, uiOpenNoteModal, uiOpenRoutineModal } from '../../actions/ui';
import { taskStartSave } from '../../actions/task';


export const AddNewFab = ({ type }) => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        switch (type) {
            case 'note':
                dispatch(uiOpenNoteModal());
                break;
            case 'routine':
                dispatch(uiOpenRoutineModal());
                break;
            case 'guardar':
                dispatch(taskStartSave());
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
            className={(type === 'guardar') ? 'fab fab-guardar' : 'fab'}
            onClick={handleOnClick}
        >
            {
                (type === 'guardar')
                    ? <div><i className="far fa-save"></i> Save </div>
                    : <i className="fas fa-plus"></i>
            }
        </button>
    )
}
