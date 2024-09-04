import { RecordIdAction } from '../actions/record_id';
import { RecordIdActionTypes } from '../action-types/record_id';

const recordIdReducer = (state: number = 0, action: RecordIdAction) => {
    switch (action.type) {
        case RecordIdActionTypes.RecordId:
            return action.payload;

        default:
            return state;
    }
};

export default recordIdReducer;
