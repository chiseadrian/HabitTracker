import React from 'react';

import { calculateTotalRoutines } from '../../helpers/calculateTotal';
import { RoutineHabit } from './RoutineHabit';


export const RoutineTable = ({ routines }) => {
    const total = calculateTotalRoutines(routines);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" width="50px"></th>
                    <th scope="col" width="50px"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Frecuency <small>(per week)</small></th>
                    <th scope="col">Goal</th>
                </tr>
            </thead>
            <tbody>
                {
                    (routines.length > 0)
                        ? (
                            routines.map((habit, i) => {
                                return <RoutineHabit key={i} {...habit} />
                            })
                        )
                        : (
                            <tr><th colSpan="5" style={{ textAlign: 'center' }}>No data available</th></tr>
                        )
                }
                <tr>
                    <th scope="row" colSpan="4"><h4>Total</h4></th>
                    <td>{total}</td>
                </tr>
            </tbody>
        </table>
    )
}
