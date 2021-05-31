import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listStartLoading } from '../../actions/list';
import { uiOpenListModal } from '../../actions/ui';
import { AddNewFab } from '../ui/AddNewFab';
import { MainTopBar } from '../ui/MainTopBar';
import { ListModal } from './ListModal';
import { ListTab } from './ListTab';
import { ListTable } from './ListTable';


export const ListsScreen = () => {
    const dispatch = useDispatch();
    const { lists, activeList } = useSelector(state => state.list)

    useEffect(() => {
        dispatch(listStartLoading());
    }, [dispatch]);

    const handleAddList = () => {
        dispatch(uiOpenListModal('list'));
    }

    return (
        <div className="fill-parent main__content align-center">
            <MainTopBar title={'Lists'} />

            <ul className="nav nav-tabs bg-dark" style={{ border: 'none' }}>
                <li className="nav-item">
                    <button
                        className="list-add"
                        onClick={handleAddList}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </li>

                {
                    lists.map((list) => (
                        <ListTab
                            key={list.id}
                            {...list}
                        />
                    ))
                }
            </ul>

            {
                (activeList)
                    ? <ListTable list={activeList} />
                    : <div className="pointer-message" onClick={handleAddList}>Add list</div>
            }

            <ListModal />
            {
                (lists.length > 0) && (
                    <AddNewFab type='list-row' />
                )
            }
        </div>
    )
}
