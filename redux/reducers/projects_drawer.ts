import { ProjectsDrawerAction } from "../actions/projects_drawer";
import { ProjectsDrawerActionTypes } from '../action-types/projects_drawer'


const projectsDrawerReducer = (state: boolean = false, action: ProjectsDrawerAction) => {
    switch (action.type) {

        case ProjectsDrawerActionTypes.ProjectsDrawer:
            return action.payload

        default:
            return state

    }
}

export default projectsDrawerReducer