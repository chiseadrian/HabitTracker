import React from 'react';

import { calculateTotalMonth } from '../../helpers/calculateTotal';


export const MonthTable = ({ days, routines, last }) => {
    const monthData = calculateTotalMonth(days, routines, parseInt(last.format('DD')));

    return (
        <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Routine</th>
                    <th scope="col">Average</th>
                    <th scope="col">Done</th>
                    <th scope="col">Goal</th>
                    <th scope="col">%</th>
                </tr>
            </thead>
            <tbody>
                {
                    monthData.map(({ name, average, completed, done, goal }, i) => (
                        <tr key={i}>
                            <th>{name}</th>
                            <td>{average}</td>
                            <td>{done}</td>
                            <td>{goal}</td>
                            <td>{completed} %</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
