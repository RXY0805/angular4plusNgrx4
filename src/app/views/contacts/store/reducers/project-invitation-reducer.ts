import { ProjectInvitation } from '@app-core/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as projectInvitationActions from '../actions/project-invitation-actions';
import { createSelector } from '@ngrx/store';

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const projectInvitationsAdapter = createEntityAdapter<ProjectInvitation>({
  selectId: (projectInvitation:  ProjectInvitation ) => projectInvitation.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contact> {
//   ids: string[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects
export interface State extends EntityState<ProjectInvitation> {
  currentProjectInvitationId?: number,
 
}

export const INIT_STATE: State = projectInvitationsAdapter.getInitialState({
  currentProjectInvitationId: undefined
});

export function reducer(state: State = INIT_STATE, { type, payload }: projectInvitationActions.All) {

  switch (type) {

    //case contactsActions.SEARCH_COMPLETE:
    case projectInvitationActions.SET_CURRENT_ID: {
      return { ...state, currentProjectInvitationId: payload }
    }

    case projectInvitationActions.CREATE_SUCCESS: {
        return {...state, ...projectInvitationsAdapter.addOne(payload as ProjectInvitation, state)}
    }


    default: {
      return state;
    }

  }
}

export const getCurrentProjectInvitationId = (state: State) => state.currentProjectInvitationId;

