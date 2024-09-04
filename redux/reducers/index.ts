import {combineReducers} from 'redux';

import projectIdReducer from './project_id';
import recordIdReducer from './record_id';
import projectsDrawerReducer from './projects_drawer';
import accessesReducer from './accesses';
import editRecordAccessReducer from "./edit_record_access";
import formVisibilityReducer from "./form_visibility";
import notifCountReducer from "./notif_count";
import informationTableValuesReducer from "./information_table_values";
import formIdReducer from "./form_id";
import contentParamsReducer from "./content_params";

const reducers = combineReducers({
    projectsDrawerVisible: projectsDrawerReducer,
    projectId: projectIdReducer,
    recordId: recordIdReducer,
    accesses: accessesReducer,
    editRecordAccess: editRecordAccessReducer,
    formVisibility: formVisibilityReducer,
    notifCount: notifCountReducer,
    table_values: informationTableValuesReducer,
    formId: formIdReducer,
    content_params: contentParamsReducer
});

export type State = ReturnType<typeof reducers>;

export default reducers;
