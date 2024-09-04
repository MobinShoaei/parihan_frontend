import {ContentParamsAction} from "../actions/content_params";
import {ContentParamsTypes} from "../action-types/content_params";

const contentParamsReducer = (state: { [key: string]: string | number } = {}, action: ContentParamsAction) => {
    switch (action.type) {
        case ContentParamsTypes.ContentParams:
            return action.payload;

        default:
            return state;
    }
};

export default contentParamsReducer;
