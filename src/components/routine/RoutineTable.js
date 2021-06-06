import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenRoutineModal } from '../../actions/ui';
import { calculateTotalRoutines } from '../../helpers/calculateTotal';
import { RoutineHabit } from './RoutineHabit';


export const RoutineTable = ({ routines }) => {
    const dispatch = useDispatch();
    const total = calculateTotalRoutines(routines);

    const handleAddRoutine = () => {
        dispatch(uiOpenRoutineModal());
    }

    return (
        <div className="scroll-x">
            <table className="table table-striped">
                <thead>
                    <tr className="table-header">
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
                                <tr><td colSpan="5" className="pointer-message tour-step-2" onClick={handleAddRoutine} >Add routine +</td></tr>
                            )
                    }
                    {
                        (routines.length > 0) && (
                            <tr className="table-header" style={{ border: 'none' }}>
                                <th scope="row" colSpan="4"><h4>Total</h4></th>
                                <th>{total}</th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
