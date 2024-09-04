import { RecordIdActionTypes } from '../action-types/record_id';

interface SetRecordIdAction {
    type: RecordIdActionTypes.RecordId;
    payload: number;
}

export const setRecordId = (count: number) => {
    return {
        type: RecordIdActionTypes.RecordId,
        payload: count,
    };
};

export type RecordIdAction = SetRecordIdAction;
