import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { listStartLoading } from '../../actions/list';
import { uiOpenListModal } from '../../actions/ui';
import { AddNewFab } from '../ui/AddNewFab';
import { MainTopBar } from '../ui/MainTopBar';
import { ListModal } from './ListModal';
import { ListTab } from './ListTab';
import { ListTable } from './ListTable';


export const ListsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { lists, activeList } = useSelector(state => state.list)


    const handleAddList = () => {
        dispatch(uiOpenListModal('list'));
    }

    useEffect(() => {
        dispatch(listStartLoading());
    }, [dispatch]);


    return (
        <div className="fill-parent align-center">
            <MainTopBar title={'Lists'} t={t} />

            <div className="content-scroll-y">
                <ul className="nav nav-tabs" style={{ border: 'none' }}>
                    <div className="list-tab-scroll">
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
                    </div>
                </ul>

                {
                    (activeList)
                        ? <ListTable list={activeList} t={t} />
                        : <div className="pointer-message" onClick={handleAddList}> Add list </div>
                }

                <ListModal t={t} />

                {
                    (lists.length > 0) && <AddNewFab type='list-row' />
                }
            </div>
        </div>
    )
}
