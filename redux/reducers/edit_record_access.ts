import {EditRecordAccessAction} from "../actions/edit_record_access";
import {EditRecordAccessTypes} from "../action-types/edit_record_access";


const editRecordAccessReducer = (state: boolean = false, action: EditRecordAccessAction) => {
    switch (action.type) {

        case EditRecordAccessTypes.EditRecordAccess:
            return action.payload

        default:
            return state

    }
}

export default editRecordAccessReducer