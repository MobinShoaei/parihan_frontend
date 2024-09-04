import {AccessesAction} from "../actions/accesses";
import {AccessesTypes} from '../action-types/accesses'


const accessesReducer = (state: string[] = [], action: AccessesAction) => {
    switch (action.type) {

        case AccessesTypes.Accesses:
            return action.payload

        default:
            return state

    }
}

export default accessesReducer