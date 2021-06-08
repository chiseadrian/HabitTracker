import { types } from "../types/types";
import { fetchSinToken } from "../helpers/fetch";


export const getBackgroundImage = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchSinToken('helpers');
            const body = await resp.json();
            const image = body.image;
            dispatch(uiSetBackgroundImage(image));
        } catch (error) {
            console.log(error);
        }
    }
}

export const uiCloseModal = () => ({ type: types.uiCloseModal });
export const uiOpenNoteModal = () => ({ type: types.uiOpenNoteModal });
export const uiOpenRoutineModal = () => ({ type: types.uiOpenRoutineModal });
export const uiOpenListModal = (modalType) => ({
    type: types.uiOpenListModal,
    payload: modalType
});

export const uiOpenSidebar = () => ({ type: types.uiOpenSidebar });
export const uiCloseSidebar = () => ({ type: types.uiCloseSidebar });
export const uiSetBackgroundImage = (image) => ({
    type: types.uiSetBackgroundImage,
    payload: image
});
