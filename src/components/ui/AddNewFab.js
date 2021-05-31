import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenListModal, uiOpenNoteModal, uiOpenRoutineModal } from '../../actions/ui';
import { taskStartSave } from '../../actions/task';


export const AddNewFab = ({ type }) => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        if (type === 'note') {
            dispatch(uiOpenNoteModal());
        } else if (type === 'routine') {
            dispatch(uiOpenRoutineModal());
        } else if (type === "guardar") {
            dispatch(taskStartSave());
        } else if (type === 'list-row') {
            dispatch(uiOpenListModal('list-row-add'))
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
