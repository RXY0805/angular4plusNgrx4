import { Contact } from '@app-core/models';
import { EntityState, createEntityAdapter} from '@ngrx/entity';
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const contactsAdapter = createEntityAdapter<Contact>({
  selectId: (contact: Contact) => contact.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contact> {
//   ids: string[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects
export interface State extends EntityState<Contact>{
  currentContactId?: string
}

export const INIT_STATE: State = contactsAdapter.getInitialState({
  currentContactId: undefined
});



export function reducer(
  state: State = INIT_STATE,
  {type, payload}: contactsActions.All
){

  switch (type) {

    //case contactsActions.SEARCH_COMPLETE:
    case contactsActions.SET_CURRENT_CONTACT_ID : {
      return {...state, currentContactId: payload}
    }

    case contactsActions.SEARCH: {
      return {
        ...state,
      }
    }

    case contactsActions.LOAD_ALL_SUCCESS : {
      return {...state, ...contactsAdapter.addAll(payload as Contact[], state)}
    }

    case contactsActions.LOAD_SUCCESS || contactsActions.CREATE_SUCCESS : {
      return {...state, ...contactsAdapter.addOne(payload as Contact, state)}
    }

    case contactsActions.UPDATE_SUCCESS : {
      return {
        ...state,
        ...contactsAdapter.updateOne({
          id: payload.id,
          changes: payload
        }, state)
      }
    }

    case contactsActions.DELETE_SUCCESS : {
      return {...state, ...contactsAdapter.removeOne(payload, state)}
    }

    default: {
      return state;
    }

  }
}

export const getCurrentContactId = (state: State) => state.currentContactId;
