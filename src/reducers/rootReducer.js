import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { listReducer } from './listReducer';
import { noteReducer } from './noteReducer';
import { routineReducer } from './routineReducer';
import { uiReducer } from './uiReducer';
import { weekTaskReducer } from './weekTaskReducer';


export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    routine: routineReducer,
    week: weekTaskReducer,
    note: noteReducer,
    list: listReducer,
});
