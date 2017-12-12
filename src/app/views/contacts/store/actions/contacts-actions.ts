import { Action } from '@ngrx/store';
import { Contact } from '@app-core/models';


export const LOAD_ALL = '[Contacts] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Contacts] LOAD ALL SUCCESS';

export const LOAD = '[Contacts] LOAD';
export const LOAD_SUCCESS = '[Contacts] LOAD SUCCESS';

export const CREATE = '[Contacts] CREATE';
export const CREATE_SUCCESS = '[Contacts] CREATE SUCCESS';
export const CREATE_ERROR = '[Contacts] CREATE ERROR';

export const UPDATE = '[Contacts] UPDATE';
export const UPDATE_SUCCESS = '[Contacts] UPDATE SUCCESS';
export const UPDATE_ERROR = '[Contacts] UPDATE ERROR';

export const DELETE = '[Contacts] DELETE';
export const DELETE_SUCCESS = '[Contacts] DELETE SUCCESS';

export const SEARCH = '[Contacts] SEARCH';
export const SEARCH_COMPLETE = '[Contacts] SEARCH COMPLETE';
export const SEARCH_ERROR = '[Contacts] SEARCH ERROR';

export const CHECK_EMAIL_EXIST = '[Contacts] CHECK EMAIL EXIST';
export const CHECK_EMAIL_COMPLETE = '[Contacts] CHECK EMAIL COMPLETE';
export const CHECK_EMAIL_ERROR = '[Contacts] CHECK EMAIL ERROR';

export const SET_CURRENT_CONTACT_ID = '[Contacts] SET CURRENT CONTACT ID';

import { ContactFilter } from '@app-core/models';


export class SetCurrentContactId implements Action {
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
  constructor(public payload: Contact) {}
}


export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Contact) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: string) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Contact[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Contact) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Contact) {}
}

export class CreateError implements Action {
  readonly type = CREATE_ERROR;
  constructor(public payload: Contact) {}
}


export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: Contact) {}
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

  constructor(public payload: ContactFilter) {}
}

export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Contact[]) {}
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
    | SetCurrentContactId
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
