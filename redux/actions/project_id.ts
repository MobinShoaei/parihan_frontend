import { ProjectIdActionTypes } from '../action-types/project_id'


interface SetProjectIdAction {
    type: ProjectIdActionTypes.ProjectId
    payload: number
}

export const setProjectId = (count: number) => {
    return {
        type: ProjectIdActionTypes.ProjectId,
        payload: count
    }
}

export type ProjectIdAction = SetProjectIdAction