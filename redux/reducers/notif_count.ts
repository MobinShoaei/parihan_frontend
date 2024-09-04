import {NotifCountAction} from '../actions/notif_count';
import {NotifCountTypes} from '../action-types/notif_count';

const notifCountReducer = (state: number = 0, action: NotifCountAction) => {
    switch (action.type) {
        case NotifCountTypes.NotifCount:
            return action.payload;

        default:
            return state;
    }
};

export default notifCountReducer;
