import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromUi from './reducers/ui-reducer';

export interface State {
  ui: fromUi.UiState
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.reducer
  // more reducers here
};


/// selectors
export const getUiState = createFeatureSelector<fromUi.UiState>('ui');

export const getCurrentTitle = createSelector(getUiState, fromUi.getCurrentTitle);

export * from './reducers';
export * from './actions';
export * from './effects';





