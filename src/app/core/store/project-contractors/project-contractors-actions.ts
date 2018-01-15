import { Action } from '@ngrx/store';
import { ProjectContractors, ContractorFilter } from '@app-core/models';

export const LOAD_ALL = '[Project Contractors] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Project Contractors] LOAD ALL SUCCESS';

export const LOAD = '[Project Contractors] LOAD';
export const LOAD_SUCCESS = '[Project Contractors] LOAD SUCCESS';




export class LoadAll implements Action {
  readonly type = LOAD_ALL;
  constructor(public payload = null) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: ProjectContractors[]) {}
}

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: ProjectContractors) {}
}



export type All =
    | LoadAll
    | Load
    | LoadAllSuccess
    | LoadSuccess
