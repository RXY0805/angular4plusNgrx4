import * as fromContractors from './contractor-reducers'
//import * as fromSearch from './reducers/search';
import * as fromRoot from '@app-root-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { getMatchingContractorIds } from './contractor-reducers';

export interface ContractorsState {
  contractors: fromContractors.State;
  //search: fromSearch.State;
}

// This is a lazy loaded state, so we need to extend from the App Root State
export interface State extends fromRoot.State {
  contractors: ContractorsState
}

export const reducers = {
  contractors: fromContractors.reducer,
  //search: fromSearch.reducer
};

export const getContractorsRootState = createFeatureSelector<ContractorsState>('contractors');

export const getContractorsState = createSelector(
    getContractorsRootState,
    state => state.contractors
);

export const getSelectedContractorId = createSelector(
  getContractorsState,
  fromContractors.getCurrentContractorId
);

export const {
  selectAll: getAllContractors,
  selectEntities: getContractorEntities
} = fromContractors.contractorsAdapter.getSelectors(getContractorsState);

export const getCurrentContractor = createSelector(
  getContractorEntities,
  getSelectedContractorId,
  (entities, id) => id && entities[id]
);

/** Get search reducer selectors */
// export const getSearchState = createSelector(
//   getContractorsRootState,
//   (state: ContractorsState) => state.search
// )

// export const getSearchResultContractors = createSelector(
//   getContractorEntities,
//   getMatchingContractorIds,
//   (allEntities, result) => result.map(x => allEntities[x])
// )

// export const getSearchContractorIds = createSelector(
//   getSearchState,
//   fromSearch.getIds
// )
// export const getSearchQuery = createSelector(
//   getSearchState,
//   fromSearch.getQuery
// );
// export const getSearchLoading = createSelector(
//   getSearchState,
//   fromSearch.getLoading
// );
// export const getSearchError = createSelector(
//   getSearchState,
//   fromSearch.getError
// );

// export const getSearchResults = createSelector(
//   getContractorEntities,
//   getSearchContractorIds,
//   (books, searchIds) => {
//     return searchIds.map(id => books[id]);
//   }
// );





