import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { ListNewListFormModal } from './ListNewListFormModal';
import { ListNewRowFormModal } from './ListNewRowFormModal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        maxHeight: 'fit-content',
        paddingBottom: '20px'
    }
};

export const ListModal = () => {
    const dispatch = useDispatch();
    const { modalListOpen, modalType } = useSelector(state => state.ui);

    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    return (
        <Modal
            isOpen={modalListOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            {(modalType === 'list') && <ListNewListFormModal type="add" />}
            {(modalType === 'list-update') && <ListNewListFormModal type="update" />}
            {(modalType === 'list-row-add') && <ListNewRowFormModal type="add" />}
            {(modalType === 'list-row-update') && <ListNewRowFormModal type="update" />}
        </Modal >
    )
}
