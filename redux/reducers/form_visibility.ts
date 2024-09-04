import {FormVisibilityAction} from "../actions/form_visibility";
import {FormVisibilityTypes} from "../action-types/form_visibility";


const formVisibilityReducer = (state: boolean = false, action: FormVisibilityAction) => {
    switch (action.type) {

        case FormVisibilityTypes.FormVisibility:
            return action.payload

        default:
            return state

    }
}

export default formVisibilityReducer