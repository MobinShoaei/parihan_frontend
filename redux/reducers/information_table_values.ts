import {FormContentType} from "../../src/dashboard/InformationTable";
import {InformationTableValuesAction} from "../actions/information_table_values";
import {InformationTableValuesTypes} from "../action-types/information_table_values";

const informationTableValuesReducer = (state: FormContentType[] = [], action: InformationTableValuesAction) => {
    switch (action.type) {
        case InformationTableValuesTypes.InformationTableValues:
            return action.payload;

        default:
            return state;
    }
};

export default informationTableValuesReducer;
