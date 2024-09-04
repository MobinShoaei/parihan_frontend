import {FormIdActionTypes} from '../action-types/form_id'


interface SetFormIdAction {
    type: FormIdActionTypes.FormId
    payload: number
}

export const setFormId = (count: number) => {
    return {
        type: FormIdActionTypes.FormId,
        payload: count
    }
}

export type FormIdAction = SetFormIdAction