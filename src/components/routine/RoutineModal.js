import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { routineClearActive, routineStartAddNew, routineStartUpdate } from '../../actions/routine';
import { uiCloseModal } from '../../actions/ui';
import { timeToMinutes, timeToTableFormat } from '../../helpers/timeFormat';
import { useForm } from '../../hooks/useForm';


Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        paddingBottom: '20px'
    }
};
const initEvent = {
    name: '',
    frecuency: '7',
    goal: '',
}

export const RoutineModal = () => {
    const dispatch = useDispatch();
    const { modalRoutineOpen } = useSelector(state => state.ui);
    const { activeRoutine } = useSelector(state => state.routine);

    const [formValues, handleInputChange, setFormValues] = useForm(initEvent);
    const { name, frecuency, goal } = formValues;


    useEffect(() => {
        if (activeRoutine) {
            setFormValues({
                ...activeRoutine,
                goal: timeToTableFormat(activeRoutine.goal)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRoutine])


    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (name === '' || frecuency === '' || goal === '')
            return Swal.fire('All fields are required !', '', 'warning');

        const data = {
            ...formValues,
            frecuency: parseInt(frecuency),
            goal: timeToMinutes(goal),
        }

        if (!data.goal)
            return Swal.fire('Goal format incorrect !', '', 'warning');

        if (activeRoutine) {
            dispatch(routineStartUpdate(data));
        } else {
            dispatch(routineStartAddNew({
                ...data,
                date: new Date().getTime()
            }));
        }

        closeModal();
    }

    const closeModal = () => {
        if (activeRoutine)
            dispatch(routineClearActive());
        dispatch(uiCloseModal());
        setFormValues(initEvent);
    }

    return (
        <Modal
            isOpen={modalRoutineOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h2 className="ml-1"> {(activeRoutine) ? 'Edit' : 'Add'} Routine </h2>

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
                            placeholder="e.g. Run"
                            name="name"
                            autoComplete="off"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <br />

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> Frecuency: </label>
                    <div className="col-sm-9">
                        <select
                            className={`form-select ${(frecuency === "") ? 'modal-border-error' : 'modal-border'}`}
                            name="frecuency"
                            value={frecuency}
                            onChange={handleInputChange}
                        >
                            <option value="1">1 Day</option>
                            <option value="2">2 Day</option>
                            <option value="3">3 Day</option>
                            <option value="4">4 Day</option>
                            <option value="5">5 Day</option>
                            <option value="6">6 Day</option>
                            <option value="7">Everyday</option>
                        </select>
                    </div>
                </div>
                <br />

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"> Goal: </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className={`form-control ${(goal === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder="e.g. 1:25"
                            name="goal"
                            autoComplete="off"
                            value={goal}
                            onChange={handleInputChange}
                        />
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
        </Modal >
    )
}
