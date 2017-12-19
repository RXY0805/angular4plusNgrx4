import { Action } from '@ngrx/store';
import { Contractor, ContractorFilter, ProjectInvitation } from '../../models/contractor';


export const LOAD_ALL = '[Contractors] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Contractors] LOAD ALL SUCCESS';

export const LOAD = '[Contractors] LOAD';
export const LOAD_SUCCESS = '[Contractors] LOAD SUCCESS';

export const CREATE = '[Contractors] CREATE';
export const CREATE_SUCCESS = '[Contractors] CREATE SUCCESS';
export const CREATE_ERROR = '[Contractors] CREATE ERROR';

export const UPDATE = '[Contractors] UPDATE';
export const UPDATE_SUCCESS = '[Contractors] UPDATE SUCCESS';
export const UPDATE_ERROR = '[Contractors] UPDATE ERROR';

export const DELETE = '[Contractors] DELETE';
export const DELETE_SUCCESS = '[Contractors] DELETE SUCCESS';

export const SEARCH = '[Contractors] SEARCH';
export const SEARCH_COMPLETE = '[Contractors] SEARCH COMPLETE';
export const SEARCH_ERROR = '[Contractors] SEARCH ERROR';

export const CHECK_EMAIL_EXIST = '[Contractors] CHECK EMAIL EXIST';
export const CHECK_EMAIL_COMPLETE = '[Contractors] CHECK EMAIL COMPLETE';
export const CHECK_EMAIL_ERROR = '[Contractors] CHECK EMAIL ERROR';

export const INVITE_TO_PROJECT ='[Contractors] INVITE TO PROJECT';

export const SET_CURRENT_CONTACT_ID = '[Contractors] SET CURRENT CONTACT ID';




export class SetCurrentContractorId implements Action {
  readonly type = SET_CURRENT_CONTACT_ID;
  constructor(public payload: string) {}
}

export class LoadAll implements Action {
  readonly type = LOAD_ALL;
  constructor(public payload = null) {}
}

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: string) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Contractor) {}
}

export class InviteToProject implements Action {
  readonly type = INVITE_TO_PROJECT;
  constructor(public payload: ProjectInvitation) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Contractor) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: string) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Contractor[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Contractor) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Contractor) {}
}

export class CreateError implements Action {
  readonly type = CREATE_ERROR;
  constructor(public payload: Contractor) {}
}


export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: Contractor) {}
}
export class UpdateError implements Action {
  readonly type = UPDATE_ERROR;
  constructor(public payload: string) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: string) {}
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
    | Create
    | Update
    | Delete
    | LoadAllSuccess
    | LoadSuccess
    | UpdateSuccess
    | UpdateError
    | CreateSuccess
    | CreateError
    | DeleteSuccess
    | Search
    | SearchComplete
    | SearchError
    | CheckEmailExist
    | InviteToProject
