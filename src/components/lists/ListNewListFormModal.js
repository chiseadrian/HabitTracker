import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { listStartAddNew, listStartUpdateList } from '../../actions/list';
import { useForm } from '../../hooks/useForm';
import { uiCloseModal } from '../../actions/ui';


const initState = {
    name: '',
    columns: []
}

export const ListNewListFormModal = ({ type }) => {
    const dispatch = useDispatch();
    const { activeList } = useSelector(state => state.list);
    const [formValues, handleInputChange, setFormValues] = useForm(initState);
    const { name, columns } = formValues;


    useEffect(() => {
        if (type === 'update')
            setFormValues({ columns: activeList.columns, name: activeList.name });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let errors = false;
        if (name === '' || columns.length === 0)
            return Swal.fire('All fields are required !', '', 'warning');

        columns.forEach(col => {
            if (col === "") {
                Swal.fire('All columns must have a name!', '', 'warning');
                errors = true;
            }
        });

        if (!errors) {
            if (type === 'add') {
                dispatch(listStartAddNew({
                    ...formValues,
                    date: new Date().getTime(),
                    values: {}
                }));
            } else if (type === 'update') {
                dispatch(listStartUpdateList({
                    ...activeList,
                    ...formValues
                }));
            }

            closeModal();
        }
    }

    const handleColumnChange = (e, pos) => {
        columns[pos] = e.target.value;
        setFormValues({ ...formValues, columns });
    }
    const handleDeleteColumn = (pos) => {
        columns.splice(pos, 1);
        setFormValues({ ...formValues, columns });
    }
    const closeModal = () => {
        dispatch(uiCloseModal());
        setFormValues(initState);
    }

    return (
        <>
            <h2 className="ml-1"> {(type === 'update') ? 'Edit' : (type === 'add') && 'Add'} List </h2>

            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> Name: </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className={`form-control ${(name === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder="e.g. Meals"
                            autoComplete="off"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> Columns: </label>
                    <div className="col-sm-9">
                        {
                            columns.map((column, pos) => (
                                <div className="modal-input-column" key={pos}>
                                    <input
                                        type="text"
                                        className={`form-control ${(column === "") ? 'modal-border-error' : 'modal-border'}`}
                                        placeholder="e.g. Breakfast"
                                        autoComplete="off"
                                        name={pos}
                                        value={column}
                                        onChange={(e) => handleColumnChange(e, pos)}
                                    />
                                    <div
                                        className="modal-delete-list-column"
                                        onClick={() => handleDeleteColumn(pos)}
                                    >
                                        <i className="far fa-trash-alt"></i>
                                    </div>
                                </div>
                            ))
                        }
                        <p
                            className="modal-add-column"
                            onClick={() => setFormValues({ ...formValues, columns: [...columns, ''] })}
                        >
                            Add column +
                </p>
                    </div>
                </div>
                <br />

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
