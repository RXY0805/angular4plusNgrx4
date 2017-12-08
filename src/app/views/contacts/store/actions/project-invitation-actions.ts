import { Action } from '@ngrx/store';
import { Contact, ProjectInvitation } from '@app-core/models';

export const CREATE = '[Project Invitation] CREATE';
export const CREATE_SUCCESS = '[Project Invitation] CREATE SUCCESS';
export const CREATE_ERROR = '[Project Invitation] CREATE ERROR';
export const SET_CURRENT_ID = '[Project Invitation] SET CURRENT ID'

export class SetCurrentId implements Action {
    readonly type = SET_CURRENT_ID;
    constructor(public payload: number) {}
  }

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload:  ProjectInvitation) {}
}


export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: ProjectInvitation) {}
}

export class CreateError implements Action {
  readonly type = CREATE_ERROR;
  constructor(public payload: ProjectInvitation) {}
}

export type All =
    | CreateSuccess
    | CreateError
    | Create
    | SetCurrentId

