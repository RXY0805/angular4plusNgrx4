import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromContacts from './reducers/contacts-reducer'
import * as fromSearchEmail from './reducers/search-email-reducer';

import * as fromRoot from '@app-root-store';

//import { getMatchingContactIds } from './reducers/contacts-reducer';

export interface ContactsState {
  contacts: fromContacts.State;
  searchEmail: fromSearchEmail.State;

}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
  contacts: ContactsState
}

export const reducers = {
  contacts: fromContacts.reducer,
  //searchEmail: fromSearchEmail.reducer,
};

export const getContactsRootState = createFeatureSelector<ContactsState>('contacts');


export const getContactsState = createSelector(
  getContactsRootState,
  state => state.contacts,
);



export const {
  selectAll: getAllContacts,
  selectEntities: getContactEntities
} = fromContacts.contactsAdapter.getSelectors(getContactsState);

export const getSelectedContactId = createSelector(
  getContactsState,
  fromContacts.getCurrentContactId
);

export const getMatchingContactIds = createSelector(
  getContactsState,
  fromContacts.getDisplayedContactListIds
);


export const getAvailableContactIds = createSelector(
  getContactsState,
  fromContacts.getAvailableContactListIds
);

export const selectMatchingContacts = createSelector(getContactsState, getMatchingContactIds,
     (allContacts, matchingIds: string[],) => 
        !matchingIds
          ? Object.keys(allContacts)
            .map(key => allContacts[key])
            .filter(c => !c.isPending)
          : matchingIds.map(x => allContacts[x])
  );

export const getAvailableContacts = createSelector(getContactsState, getAvailableContactIds,
    (allContacts, matchingIds: string[]) => matchingIds.map(x => allContacts[x])
);

export const getCurrentContact = createSelector(getContactsState , getSelectedContactId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
)
// export const getMatchingContactIds = (state: State) => state.displayedContactListIds;
// export const getAvailableContactIds =(state: State) => state.availableContactListId;

// export const getContactEntities = (state: State) => state.entities;
// //export const getSelectedProjectId =(state:State) => state.selectedProjectId;

// export const selectAllContacts = (state: any) => Object.keys(state.entities).map(key => state.entities[key]);

// export const selectMatchingContacts = createSelector(getContactEntities, getMatchingContactIds,
//   (allContacts, matchingIds: string[],) => 
//     !matchingIds
//       ? Object.keys(allContacts)
//         .map(key => allContacts[key])
//         .filter(c => !c.isPending)
//       : matchingIds.map(x => allContacts[x])
//   );

//   export const getAvailableContacts = createSelector(getContactEntities, getAvailableContactIds,
//     (allContacts, matchingIds: string[]) => matchingIds.map(x => allContacts[x])
     
     
//     );





