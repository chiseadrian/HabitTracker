import React from 'react';

import { calculateTotalMonth } from '../../../helpers/calculateTotal';
import { colors } from '../../../static/colors';


export const MonthTable = ({ days, routines, last, t }) => {
    const monthData = calculateTotalMonth(days, routines, parseInt(last.format('DD')));

    return (
        <div className="scroll-x">
            <table className="table table-striped mt-5">
                <thead>
                    <tr className="table-header">
                        <th scope="col" style={{ width: '20%' }}>{t('Routine')}</th>
                        <th scope="col">{t('Average')}</th>
                        <th scope="col" >{t('Done')}</th>
                        <th scope="col" >{t('Goal')}</th>
                        <th scope="col" >{t('Completed')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        monthData.map(({ name, average, completed, done, goal }, i) => (
                            <tr key={i}>
                                <th style={{ background: `rgba(${colors[i]}, 0.1)` }}>{name}</th>
                                <td>{average}</td>
                                <td>{done}</td>
                                <td>{goal}</td>
                                <td>{completed}%</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
