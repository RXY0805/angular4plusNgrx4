import { Project } from '@app-core/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as projectsActions from './project-actions';
import { createSelector } from '@ngrx/store';

// This adapter will allow is to manipulate projects (mostly CRUD operations)
export const projectsAdapter = createEntityAdapter<Project>({
  selectId: (project: Project) => project.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Project> {
//   ids: string[];
//   entities: { [id: string]: Project };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects
export interface State extends EntityState<Project> {
  currentProjectId?: string,
}

export const INIT_STATE: State = projectsAdapter.getInitialState({
  currentProjectId: undefined,
});

export function reducer(state: State = INIT_STATE, { type, payload }: projectsActions.All) {

  switch (type) {

    //case projectsActions.SEARCH_COMPLETE:
    case projectsActions.SET_CURRENT_PROJECT_ID: {
      return { ...state, currentProjectId: payload }
    }

    case projectsActions.LOAD_ALL_SUCCESS: {
      return { ...state, ...projectsAdapter.addAll(payload as Project[], state) }
    }

    default: {
      return state;
    }

  }
}

export const getCurrentProjectId = (state: State) => state.currentProjectId;
export const getProjectEntities = (state: State) => state.entities;
//export const getSelectedProjectId =(state:State) => state.selectedProjectId;

export const selectAllProjects = (state: any) => Object.keys(state.entities).map(key => state.entities[key]);



    
