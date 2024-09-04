import { ProjectIdAction } from "../actions/project_id";
import { ProjectIdActionTypes } from '../action-types/project_id'


const projectIdReducer = (state: number = 0, action: ProjectIdAction) => {
    switch (action.type) {

        case ProjectIdActionTypes.ProjectId:
            return action.payload

        default:
            return state

    }
}

export default projectIdReducer