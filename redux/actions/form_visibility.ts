import {FormVisibilityTypes} from '../action-types/form_visibility'


interface SetFormVisibilityAction {
    type: FormVisibilityTypes.FormVisibility
    payload: boolean
}

export const setFormVisibility = (access: boolean) => {
    return {
        type: FormVisibilityTypes.FormVisibility,
        payload: access
    }
}

export type FormVisibilityAction = SetFormVisibilityAction