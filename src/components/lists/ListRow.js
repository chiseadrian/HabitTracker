import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { listSetActiveRow, listStartRow } from '../../actions/list';
import { uiOpenListModal } from '../../actions/ui';
import { getActiveRowToEdit } from '../../helpers/prepareState';


export const ListRow = ({ row, date: id }) => {
    const dispatch = useDispatch();
    const { activeList } = useSelector(state => state.list);
    const { columns } = activeList;

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed)
                dispatch(listStartRow('delete', parseInt(id)));
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
                    <td key={i}> {row[col]} </td>
                ))
            }
        </tr>
    )
}
