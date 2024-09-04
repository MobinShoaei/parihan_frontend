import { ProjectsDrawerActionTypes } from '../action-types/projects_drawer'


interface SetProjectsDrawerAction {
    type: ProjectsDrawerActionTypes.ProjectsDrawer
    payload: boolean
}

export const setProjectsDrawer = (visible: boolean) => {
    return {
        type: ProjectsDrawerActionTypes.ProjectsDrawer,
        payload: visible
    }
}

export type ProjectsDrawerAction = SetProjectsDrawerAction