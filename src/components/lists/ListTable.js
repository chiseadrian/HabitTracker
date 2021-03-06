import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenListModal } from '../../actions/ui';
import { listTableFormat } from '../../helpers/tableFormat';
import { ListRow } from './ListRow';


export const ListTable = ({ list, t }) => {
    const dispatch = useDispatch();
    const { columns, values } = list;
    const { rows, dates } = listTableFormat(values, columns);

    const handleEditList = () => {
        dispatch(uiOpenListModal('list-update'))
    }

    return (
        <div className="scroll-x">
            <table className="table table-striped">
                <thead>
                    <tr className="table-header ">
                        <th scope="row" width="50px">
                            <button
                                className="table-header-button"
                                onClick={handleEditList}
                            >
                                <i className="fas fa-cog"></i>
                            </button>
                        </th>
                        <th scope="row" width="50px"></th>
                        <th scope="col" width="180px" style={{ minWidth: '160px' }}>{t('Date')}</th>
                        {
                            columns.map((column, i) => (
                                <th scope="col" key={i} width={`${75 / columns.length}%`}>{column}</th>
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
                                        t={t}
                                    />
                                ))
                            )
                            : <tr><th colSpan={columns.length + 3} style={{ textAlign: 'center' }}>{t('No data available')}</th></tr>
                    }
                </tbody>
            </table >
        </div>
    )
}
