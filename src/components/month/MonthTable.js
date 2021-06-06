import React from 'react';

import { calculateTotalMonth } from '../../helpers/calculateTotal';
import { colors } from '../../static/colors';


export const MonthTable = ({ days, routines, last }) => {
    const monthData = calculateTotalMonth(days, routines, parseInt(last.format('DD')));

    return (
        <div className="scroll-x">
            <table className="table table-striped mt-5">
                <thead>
                    <tr className="table-header">
                        <th scope="col" style={{ width: '20%' }}>Routine</th>
                        <th scope="col">Average</th>
                        <th scope="col" >Done</th>
                        <th scope="col" >Goal</th>
                        <th scope="col" >%</th>
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
