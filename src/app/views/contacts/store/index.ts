import * as fromContacts from './reducers/contacts-reducer'
import * as fromSearch from './reducers/search';
import * as fromRoot from '@app-root-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ContactsState {
  contacts: fromContacts.State;
  search: fromSearch.State;
}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
  contacts: ContactsState
}

export const reducers = {
  contacts: fromContacts.reducer,
  search: fromSearch.reducer
};

export const getContactsRootState = createFeatureSelector<ContactsState>('contacts');

export const getContactsState = createSelector(
    getContactsRootState,
    state => state.contacts
);

export const getSelectedContactId = createSelector(
  getContactsState,
  fromContacts.getCurrentContactId
);

export const {
  selectAll: getAllContacts,
  selectEntities: getContactEntities
} = fromContacts.contactsAdapter.getSelectors(getContactsState);

export const getCurrentContact = createSelector(
  getContactEntities,
  getSelectedContactId,
  (entities, id) => id && entities[id]
);

/** Get search reducer selectors */
export const getSearchState = createSelector(
  getContactsRootState,
  (state: ContactsState) => state.search
)

export const getSearchContactIds = createSelector(
  getSearchState,
  fromSearch.getIds
)
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

export const getSearchResults = createSelector(
  getContactEntities,
  getSearchContactIds,
  (books, searchIds) => {
    return searchIds.map(id => books[id]);
  }
);





