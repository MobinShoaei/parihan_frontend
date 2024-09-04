import {NotifCountTypes} from '../action-types/notif_count';

interface SetNotifCountAction {
    type: NotifCountTypes.NotifCount;
    payload: number;
}

export const setNotifCount = (count: number) => {
    return {
        type: NotifCountTypes.NotifCount,
        payload: count,
    };
};

export type NotifCountAction = SetNotifCountAction;
