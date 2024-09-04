import {InformationTableValuesTypes} from '../action-types/information_table_values';
import {FormContentType} from "../../src/dashboard/InformationTable";
import {ContentParamsTypes} from "../action-types/content_params";

interface SetContentParams {
    type: ContentParamsTypes.ContentParams;
    payload: { [key: string]: string | number };
}

export const setContentParams = (data: { [key: string]: string | number }) => {
    return {
        type: ContentParamsTypes.ContentParams,
        payload: data,
    };
};

export type ContentParamsAction = SetContentParams;
