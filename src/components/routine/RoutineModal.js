import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { routineClearActive, routineStartAddNew, routineStartUpdate } from '../../actions/routine';
import { uiCloseModal } from '../../actions/ui';
import { timeToMinutes, timeToTableFormat } from '../../helpers/timeFormat';
import { useForm } from '../../hooks/useForm';
import { modalCustomStyle } from '../../static/modalCustomStyle';


Modal.setAppElement('#root');

const initEvent = {
    name: '',
    frecuency: '7',
    goal: '',
}

export const RoutineModal = ({ t }) => {
    const dispatch = useDispatch();
    const { modalRoutineOpen } = useSelector(state => state.ui);
    const { activeRoutine } = useSelector(state => state.routine);

    const [formValues, handleInputChange, setFormValues] = useForm(initEvent);
    const { name, frecuency, goal } = formValues;


    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (name === '' || frecuency === '' || goal === '')
            return Swal.fire(t('All fields are required'), '', 'warning');

        const data = {
            ...formValues,
            frecuency: parseInt(frecuency),
            goal: timeToMinutes(goal),
        }

        if (!data.goal)
            return Swal.fire(t('Goal incorrect format!'), '', 'warning');

        (activeRoutine)
            ? dispatch(routineStartUpdate(data, t))
            : dispatch(routineStartAddNew({ ...data, date: new Date().getTime() }, t));

        closeModal();
    }

    const closeModal = () => {
        if (activeRoutine)
            dispatch(routineClearActive());

        dispatch(uiCloseModal());
        setFormValues(initEvent);
    }

    useEffect(() => {
        if (activeRoutine)
            setFormValues({ ...activeRoutine, goal: timeToTableFormat(activeRoutine.goal) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRoutine]);

    return (
        <Modal
            isOpen={modalRoutineOpen}
            onRequestClose={closeModal}
            style={modalCustomStyle}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h2 className="ml-1"> {(activeRoutine) ? t('Edit') : t('Add')} {t('Routine')} </h2>

            <form className="container" onSubmit={handleSubmitForm}>
                <div className="form-group row space-between">
                    <label className="col-sm-3 col-form-label"> {t('Name')}: </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className={`form-control ${(name === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder={`${t('e.g.')} ${t('Run')}`}
                            name="name"
                            autoComplete="off"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row space-between">
                    <label className="col-sm-3 col-form-label"> {t('Frecuency')} <small>({t('per week')})</small>: </label>
                    <div className="col-sm-9">
                        <select
                            className={`form-select ${(frecuency === "") ? 'modal-border-error' : 'modal-border'}`}
                            name="frecuency"
                            value={frecuency}
                            onChange={handleInputChange}
                        >
                            <option value="1">1 {t('Day')}</option>
                            <option value="2">2 {t('Days')}</option>
                            <option value="3">3 {t('Days')}</option>
                            <option value="4">4 {t('Days')}</option>
                            <option value="5">5 {t('Days')}</option>
                            <option value="6">6 {t('Days')}</option>
                            <option value="7">{t('Everyday')}</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row space-between">
                    <label className="col-sm-3 col-form-label"> {t('Goal')}: </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className={`form-control ${(goal === "") ? 'modal-border-error' : 'modal-border'}`}
                            placeholder={`${t('e.g.')} 1:25`}
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
                    <span> {t('Save')} </span>
                </button>
            </form>
        </Modal >
    )
}
