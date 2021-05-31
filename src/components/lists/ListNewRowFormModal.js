import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';

import { listStartRow } from '../../actions/list';
import { uiCloseModal } from '../../actions/ui';
import { listColumnsInitState } from '../../helpers/prepareState';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import Swal from 'sweetalert2';


export const ListNewRowFormModal = ({ type }) => {
    const dispatch = useDispatch();
    const { activeList, activeRow } = useSelector(state => state.list);
    const { columns } = activeList;

    const initState = listColumnsInitState(columns);
    const [formValues, handleInputChange, setFormValues] = useForm(initState);
    const [dateTime, onChangeDateTime] = useState(new Date());


    useEffect(() => {
        if (type === 'update') {
            setFormValues({ ...formValues, ...activeList.values[activeRow.id] });
            onChangeDateTime(new Date(parseInt(activeRow.id)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (!dateTime)
            return Swal.fire('Date is mandatory!', '', 'warning');
        if (type === 'add') {
            dispatch(listStartRow('add', formValues));
        } else if (type === 'update') {
            dispatch(listStartRow('update', {
                oldId: activeRow.id,
                newId: dateTime.getTime(),
                values: { ...formValues }
            }));
        }

        closeModal();
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        setFormValues(initState);
    }

    return (
        <>
            <h2 className="ml-1"> {(type === 'add') ? 'Add' : (type === 'update') && 'Edit'} Row </h2>
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group row" >
                    <label className="col-sm-3 col-form-label"> Date: </label>
                    <DateTimePicker
                        className="col-sm-9"
                        onChange={onChangeDateTime}
                        value={dateTime}
                    />
                </div>
                <br />
                {
                    columns.map((col, i) =>
                        <div key={i}>
                            <div className="form-group row" >
                                <label className="col-sm-3 col-form-label"> {col}: </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className={`form-control ${(formValues[col] === "") ? 'modal-border-error' : 'modal-border'}`}
                                        placeholder="..."
                                        autoComplete="off"
                                        name={col}
                                        value={formValues[col]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <br />
                        </div>
                    )
                }

                <button
                    type="submit"
                    className="modal-save"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>
            </form>
        </>
    )
}
