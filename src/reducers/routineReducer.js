import { types } from "../types/types";

const initailState = {
    routines: [],
    activeRoutine: null
}

export const routineReducer = (state = initailState, action) => {
    switch (action.type) {
        case types.routineLoaded:
            return {
                ...state,
                routines: [...action.payload]
            };
        case types.routineAddNew:
            return {
                ...state,
                routines: [...state.routines, action.payload]
            };
        case types.routineDelete:
            return {
                ...state,
                routines: state.routines.filter(routine => routine.id !== action.payload)
            };
        case types.routineUpdate:
            return {
                ...state,
                routines: state.routines.map(e => (e.id === action.payload.id) ? action.payload : e)
            };
        case types.routineSetActive:
            return {
                ...state,
                activeRoutine: action.payload
            };
        case types.routineClearActive:
            return {
                ...state,
                activeRoutine: null
            };
        case types.routineClear:
            return initailState;

        default:
            return state;
    }
}