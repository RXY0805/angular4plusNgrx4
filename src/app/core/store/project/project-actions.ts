import { Action } from '@ngrx/store';
import { Project } from '@app-core/models';

export const LOAD_ALL = '[Projects] LOAD ALL';
export const LOAD_ALL_SUCCESS = '[Projects] LOAD ALL SUCCESS';

export const SET_CURRENT_PROJECT_ID = '[Projects] SET CURRENT PROJECT ID';

export class SetCurrentProjectId implements Action {
  readonly type = SET_CURRENT_PROJECT_ID;
  constructor(public payload: string) {}
}

export class LoadAll implements Action {
  readonly type = LOAD_ALL;
  constructor(public payload = null) {}
}

export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: Project[]) {}
}

export type All =
    | SetCurrentProjectId
    | LoadAll
    | LoadAllSuccess
  
 
