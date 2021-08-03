import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { modalCustomStyle } from '../../static/modalCustomStyle';
import { ListNewListFormModal } from './ListNewListFormModal';
import { ListNewRowFormModal } from './ListNewRowFormModal';

Modal.setAppElement('#root');


export const ListModal = ({ t }) => {
    const dispatch = useDispatch();
    const { modalListOpen, modalType } = useSelector(state => state.ui);

    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    return (
        <Modal
            isOpen={modalListOpen}
            onRequestClose={closeModal}
            style={modalCustomStyle}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            {(modalType === 'list') && <ListNewListFormModal type="add" t={t} />}
            {(modalType === 'list-update') && <ListNewListFormModal type="update" t={t} />}
            {(modalType === 'list-row-add') && <ListNewRowFormModal type="add" t={t} />}
            {(modalType === 'list-row-update') && <ListNewRowFormModal type="update" t={t} />}
        </Modal >
    )
}
