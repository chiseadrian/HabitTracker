import { types } from "../types/types";

export const uiCloseModal = () => ({ type: types.uiCloseModal })
export const uiOpenNoteModal = () => ({ type: types.uiOpenNoteModal })
export const uiOpenRoutineModal = () => ({ type: types.uiOpenRoutineModal })
export const uiOpenListModal = (modalType) => ({
    type: types.uiOpenListModal,
    payload: modalType
})

export const uiOpenSidebar = () => ({ type: types.uiOpenSidebar })
export const uiCloseSidebar = () => ({ type: types.uiCloseSidebar })
