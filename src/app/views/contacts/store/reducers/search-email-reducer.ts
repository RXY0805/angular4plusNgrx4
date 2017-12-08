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

export function reducer(state = initialState, action: contactActions.All): State {
  switch (action.type) {
    case contactActions.SEARCH_EMAIL: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query,
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query,
      };
    }

    case contactActions.SEARCH_EMAIL_COMPLETE: {
      return {
        ids: action.payload.map(contact => contact.id),
        loading: false,
        error: '',
        query: state.query,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
