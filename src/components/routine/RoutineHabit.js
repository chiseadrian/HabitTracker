import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import { routineSetActive, routineStartDelete } from '../../actions/routine';
import { uiOpenRoutineModal } from '../../actions/ui';
import { timeToTableFormat } from '../../helpers/timeFormat';


export const RoutineHabit = (routine) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { id, name, frecuency, goal } = routine;

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
                dispatch(routineStartDelete(id, t));
            }
        })
    }

    const handleEdit = () => {
        dispatch(routineSetActive(routine));
        dispatch(uiOpenRoutineModal());
    }

    return (
        <tr>
            <th scope="row">
                <button
                    className="table-button"
                    onClick={handleDelete}
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            </th>
            <th scope="row">
                <button
                    className="table-button"
                    onClick={handleEdit}
                >
                    <i className="fas fa-edit"></i>
                </button>
            </th>
            <td>{name}</td>
            <td>{frecuency}</td>
            <td>{timeToTableFormat(goal)}</td>
        </tr>
    )
}
