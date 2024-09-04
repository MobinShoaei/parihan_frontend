import {EditRecordAccessTypes} from '../action-types/edit_record_access'


interface SetEditRecordAccessAction {
    type: EditRecordAccessTypes.EditRecordAccess
    payload: boolean
}

export const setEditRecordAccess = (access: boolean) => {
    return {
        type: EditRecordAccessTypes.EditRecordAccess,
        payload: access
    }
}

export type EditRecordAccessAction = SetEditRecordAccessAction