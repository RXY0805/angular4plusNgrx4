import { Action } from '@ngrx/store';
import { Contractor, ContractorFilter, ProjectContractorInvitation } from '@app-core/models';

export const LOAD_ALL = '[Contractors] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Contractors] LOAD ALL SUCCESS';

export const LOAD = '[Contractors] LOAD';
export const LOAD_SUCCESS = '[Contractors] LOAD SUCCESS';

export const SEARCH = '[Contractors] SEARCH';
export const SEARCH_COMPLETE = '[Contractors] SEARCH COMPLETE';
export const SEARCH_ERROR = '[Contractors] SEARCH ERROR';

export const CHECK_EMAIL_EXIST = '[Contractors] CHECK EMAIL EXIST';
export const CHECK_EMAIL_COMPLETE = '[Contractors] CHECK EMAIL COMPLETE';
export const CHECK_EMAIL_ERROR = '[Contractors] CHECK EMAIL ERROR';

export const INVITE_TO_PROJECT ='[Contractors] INVITE TO PROJECT';

export const SET_CURRENT_CONTRACTOR_ID = '[Contractors] SET CURRENT CONTRACTOR ID';

export class SetCurrentContractorId implements Action {
  readonly type = SET_CURRENT_CONTRACTOR_ID;
  constructor(public payload: string) {}
}

export class LoadAll implements Action {
  readonly type = LOAD_ALL;
  constructor(public payload = null) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Contractor[]) {}
}

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Contractor) {}
}

export class InviteToProject implements Action {
  readonly type = INVITE_TO_PROJECT;
  constructor(public payload: ProjectContractorInvitation) {}
}

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: ContractorFilter) {}
}

export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Contractor[]) {}
}

export class SearchError implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: string) {}
}

export class CheckEmailExist implements Action {
  readonly type = CHECK_EMAIL_EXIST;
  constructor(public payload: string){}
}

export type All =
    | SetCurrentContractorId
    | LoadAll
    | Load
    | LoadAllSuccess
    | LoadSuccess
    | Search
    | SearchComplete
    | SearchError
    | CheckEmailExist
    | InviteToProject
