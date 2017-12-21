import { Contractor, ContractorFilter } from '@app-core/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as contractorsActions from './contractor-actions';
import { createSelector } from '@ngrx/store';

// This adapter will allow is to manipulate contractors (mostly CRUD operations)
export const contractorsAdapter = createEntityAdapter<Contractor>({
  selectId: (contractor: Contractor) => contractor.companyId,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contractor> {
//   ids: string[];
//   entities: { [id: string]: Contractor };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects
export interface State extends EntityState<Contractor> {
  currentContractorId?: string,
  displayedContractorListIds?: string[],
  availableContractorListId?: string[],
  duplicatedContractorIds?: string[],
}

export const INIT_STATE: State = contractorsAdapter.getInitialState({
  currentContractorId: undefined,
});

export function reducer(state: State = INIT_STATE, { type, payload }: contractorsActions.All) {

  switch (type) {

    //case contractorsActions.SEARCH_COMPLETE:
    case contractorsActions.SET_CURRENT_CONTRACTOR_ID: {
      return { ...state, currentContractorId: payload }
    }

    case contractorsActions.CHECK_EMAIL_EXIST: {
      const email : string = payload;
 
      const duplicatedContractorIds = Object.keys(state.entities)
      .map(key => state.entities[key])
      .filter(contractor => contractor.email.toLowerCase().trim()===email.toLowerCase().trim())
      .map(contractor => contractor.companyId);
      return {
        ...state,
        duplicatedContractorIds: duplicatedContractorIds
      }
    }

    case contractorsActions.SEARCH: {
      const searchFilters: ContractorFilter = payload;

      const newContractors = Object.keys(state.entities)
        .map(key => state.entities[key])
        // .filter(contractor => !searchFilters.searchText.trim().length
        //     || contractor.name.toLowerCase().includes(searchFilters.searchText.toLowerCase()))
        .filter(contractor => !searchFilters.selectedProjectId 
            || contractor.projectId == searchFilters.selectedProjectId)
        .map(contractor => contractor.companyId);

        const availableContractors = Object.keys(state.entities)
        .map(key => state.entities[key])
        .filter(contractor => !searchFilters.selectedProjectId 
            || contractor.projectId != searchFilters.selectedProjectId)
        .map(contractor => contractor.companyId);
      
      return {
        ...state,
        displayedContractorListIds: newContractors,
        availableContractorListId: availableContractors,
      }
    }

    case contractorsActions.LOAD_ALL_SUCCESS: {
      return { ...state, ...contractorsAdapter.addAll(payload as Contractor[], state) }
    }

    case contractorsActions.LOAD_SUCCESS: {
      return { ...state, ...contractorsAdapter.addOne(payload as Contractor, state) }
    }

    // case contractorsActions.UPDATE_SUCCESS: {
    //   return {
    //     ...state,
    //     ...contractorsAdapter.updateOne({
    //       id: payload.companyId,
    //       changes: payload
    //     }, state)
    //   }
    // }

    // case contractorsActions.DELETE_SUCCESS: {
    //   return { ...state, ...contractorsAdapter.removeOne(payload, state) }
    // }

    default: {
      return state;
    }

  }
}

export const getCurrentContractorId = (state: State) => state.currentContractorId;
export const getMatchingContractorIds = (state: State) => state.displayedContractorListIds;
export const getAvailableContractorIds =(state: State) => state.availableContractorListId;
export const getDuplicatedContractorIds = (state: State) => state.duplicatedContractorIds;

export const getContractorEntities = (state: State) => state.entities;
//export const getSelectedProjectId =(state:State) => state.selectedProjectId;

export const selectAllContractors = (state: any) => Object.keys(state.entities).map(key => state.entities[key]);

export const selectMatchingContractors = createSelector(getContractorEntities, getMatchingContractorIds,
  (allContractors, matchingIds: string[],) => 
    !matchingIds
      ? Object.keys(allContractors)
        .map(key => allContractors[key])
       // .filter(c => !c.isPending)
      : matchingIds.map(x => allContractors[x])
  );

  export const getAvailableContractors = createSelector(getContractorEntities, getAvailableContractorIds,
    (allContractors, matchingIds: string[]) => !matchingIds
    ? Object.keys(allContractors)
      .map(key => allContractors[key])
      : matchingIds.map(x => allContractors[x])
    );

    
