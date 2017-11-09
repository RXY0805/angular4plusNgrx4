import * as contactActions from '../actions/contacts-actions';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

export const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};


export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
