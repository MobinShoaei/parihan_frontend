import {FormIdAction} from "../actions/form_id";
import {FormIdActionTypes} from '../action-types/form_id'


const formIdReducer = (state: number = 0, action: FormIdAction) => {
    switch (action.type) {

        case FormIdActionTypes.FormId:
            return action.payload

        default:
            return state

    }
}

export default formIdReducer