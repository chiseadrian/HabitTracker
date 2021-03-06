import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import parse from 'html-react-parser';

import { listSetActiveRow, listStartRow } from '../../actions/list';
import { uiOpenListModal } from '../../actions/ui';
import { getActiveRowToEdit } from '../../helpers/prepareState';


export const ListRow = ({ row, date: id, t }) => {
    const dispatch = useDispatch();
    const { activeList } = useSelector(state => state.list);
    const { columns } = activeList;

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
            if (result.isConfirmed)
                dispatch(listStartRow('delete', parseInt(id), t));
        })
    }

    const handleEdit = () => {
        const currentRow = getActiveRowToEdit(row, columns, id);
        dispatch(listSetActiveRow(currentRow));
        dispatch(uiOpenListModal('list-row-update'))
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
            <td > {row.date} </td>
            {
                columns.map((col, i) => (
                    <td key={i}> {(row[col] !== undefined) && parse(`${row[col]}`)} </td>
                ))
            }
        </tr>
    )
}
