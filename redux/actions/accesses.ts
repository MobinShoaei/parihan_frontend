import {AccessesTypes} from '../action-types/accesses'


interface SetAccessesAction {
    type: AccessesTypes.Accesses
    payload: string[]
}

export const setAccesses = (access: string[]) => {
    return {
        type: AccessesTypes.Accesses,
        payload: access
    }
}

export type AccessesAction = SetAccessesAction