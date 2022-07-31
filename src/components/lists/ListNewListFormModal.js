import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { listStartAddNew, listStartDeleteList, listStartUpdateList } from '../../actions/list';
import { useForm } from '../../hooks/useForm';
import { uiCloseModal } from '../../actions/ui';


const initState = {
    name: '',
    showDate: '',
    columns: []
}

export const ListNewListFormModal = ({ type, t }) => {
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
            return Swal.fire(t('All fields are required'), '', 'warning');

        columns.forEach(col => {
            if (col === "") {
                Swal.fire(t('All columns must have a name'), '', 'warning');
                errors = true;
            }
        });

        if (!errors) {
            if (type === 'add') {
                dispatch(listStartAddNew({
                    ...formValues,
                    date: new Date().getTime(),
                    values: {}
                }, t));
            } else if (type === 'update') {
                dispatch(listStartUpdateList({
                    ...activeList,
                    ...formValues
                }, t));
            }

            closeModal();
        }
    }

    const handleDeleteList = () => {
        Swal.fire({
            title: t('Delete List'),
            text: `${t('Are you sure you want to permanently delete')} "${name}" ${t('list')}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('Yes, delete it')
        }).then((result) => {
            if (result.isConfirmed)
                dispatch(listStartDeleteList(activeList.id, t));
        })
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
            <div className="modal-title">
                <h2 className="ml-1"> {(type === 'update') ? t('Edit') : (type === 'add') && t('Add')} {t('List')} </h2>
                {
                    (type === 'update') && (
                        <button className="delete modal-delete" onClick={handleDeleteList}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    )
                }
            </div>
            <form className="container" onSubmit={handleSubmitForm} >
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> {t('Name')}: </label>
                    <div className="col-sm-9 mb-1">
                        <input
                            type="text"
                            className={`form-control ${(name === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder={`${t('e.g.')} ${t('Meals')}`}
                            autoComplete="off"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <label className="col-sm-3 col-form-label"> {t('Columns')}: </label>
                    <div className="col-sm-9">
                        {
                            columns.map((column, pos) => (
                                <div className="modal-input-column" key={pos}>
                                    <input
                                        type="text"
                                        className={`form-control ${(column === "") ? 'modal-border-error' : 'modal-border'}`}
                                        placeholder={`${t('e.g.')} ${t('Breakfast')}`}
                                        autoComplete="off"
                                        name={pos}
                                        value={column}
                                        onChange={(e) => handleColumnChange(e, pos)}
                                    />
                                    <div
                                        className="modal-delete-list-column"
                                        onClick={() => handleDeleteColumn(pos)}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </div>
                                </div>
                            ))
                        }
                        <p
                            className="modal-add-column"
                            onClick={() => setFormValues({ ...formValues, columns: [...columns, ''] })}
                        >
                            {t('Add column')} +
                        </p>
                    </div>
                </div>
                <br />

                <button type="submit" className="modal-save" >
                    <i className="far fa-save"></i>
                    <span> {t('Save')} </span>
                </button>
            </form>
        </>
    )
}
