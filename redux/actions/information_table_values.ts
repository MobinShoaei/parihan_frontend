import {InformationTableValuesTypes} from '../action-types/information_table_values';
import {FormContentType} from "../../src/dashboard/InformationTable";

interface SetInformationTableValues {
    type: InformationTableValuesTypes.InformationTableValues;
    payload: FormContentType[];
}

export const setInformationTableValues = (data: FormContentType[]) => {
    return {
        type: InformationTableValuesTypes.InformationTableValues,
        payload: data,
    };
};

export type InformationTableValuesAction = SetInformationTableValues;
