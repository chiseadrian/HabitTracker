import { types } from "../types/types";

const initialState = {
    modalNoteOpen: false,
    modalRoutineOpen: false,
    modalListOpen: false,
    modalType: '',
    sidebarOpen: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenNoteModal:
            return {
                ...state,
                modalNoteOpen: true
            };
        case types.uiOpenRoutineModal:
            return {
                ...state,
                modalRoutineOpen: true
            };
        case types.uiOpenListModal:
            return {
                ...state,
                modalListOpen: true,
                modalType: action.payload
            };
        case types.uiOpenSidebar:
            return {
                ...state,
                sidebarOpen: true
            };
        case types.uiCloseModal:
            return {
                ...state,
                modalNoteOpen: false,
                modalRoutineOpen: false,
                modalListOpen: false,
                modalType: ''
            };
        case types.uiCloseSidebar:
            return {
                ...state,
                sidebarOpen: false
            };

        default:
            return state;
    }
}
