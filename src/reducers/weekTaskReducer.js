import { types } from "../types/types";

const initailState = {
    days: [],
    changes: []
}

export const weekTaskReducer = (state = initailState, action) => {
    switch (action.type) {
        case types.taskLoaded:
            return {
                ...state,
                days: [...action.payload]
            };
        case types.taskAddNewDay:
            return {
                ...state,
                changes: [...state.changes, action.payload],
            }
        case types.taskUpdateChange:
            return {
                ...state,
                changes: state.changes.map(
                    e => (e.date === action.payload.date) ? { ...e, values: { ...e.values, [action.payload.rid]: action.payload.value } } : e
                )
            }
        case types.taskUpdate:
            return {
                ...state,
                days: state.days.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            };
        case types.taskClearChanges:
            return {
                ...state,
                changes: []
            };
        case types.taskClear:
            return {
                ...initailState
            };

        default:
            return state;
    }
}
