import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { listStartDeleteList } from '../../actions/list';
import { uiOpenListModal } from '../../actions/ui';
import { listTableFormat } from '../../helpers/tableFormat';
import { ListRow } from './ListRow';


export const ListTable = ({ list }) => {
    const dispatch = useDispatch();
    const { columns, values, id, name } = list;
    const { rows, dates } = listTableFormat(values, columns);

    const handleDeleteList = () => {
        Swal.fire({
            title: 'Delete List',
            text: `Are you sure you want to permanently delete "${name}" list?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed)
                dispatch(listStartDeleteList(id));
        })
    }

    const handleEditList = () => {
        dispatch(uiOpenListModal('list-update'))
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="row" width="50px">
                        <button
                            className="delete"
                            onClick={handleDeleteList}
                        >
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </th>
                    <th scope="row" width="50px">
                        <button
                            className="delete"
                            onClick={handleEditList}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                    </th>
                    <th scope="col" width="180px">Date</th>
                    {
                        columns.map((column, i) => (
                            <th scope="col" key={i}>{column}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    (rows.length > 0)
                        ? (
                            rows.map((row, i) => (
                                <ListRow
                                    key={i}
                                    row={row}
                                    date={dates[i]}
                                />
                            ))
                        )
                        : (
                            <tr><th colSpan={columns.length + 3} style={{ textAlign: 'center' }}>No data available</th></tr>
                        )
                }
            </tbody>
        </table >
    )
}
