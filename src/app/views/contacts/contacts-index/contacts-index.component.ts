import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Contact } from '@app-core/models';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as fromRoot from '@app-root-store';

import 'rxjs/add/operator/take';
import { selectMatchingContacts } from '@app-contacts-store/reducers/contacts-reducer';

//import { getSearchResultContacts } from '@app-contacts-store';

@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsIndexComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  searchQuery$ : Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  
  
  constructor(
      public store: Store<fromContacts.State>, 
      private router: Router, 
      private actR: ActivatedRoute) {
      // this.loading$ = store.select(x => fromContacts.getSearchLoading(x.contacts.search));
      // this.error$ = store.select(x => fromContacts.getSearchError(x.contacts.search));
   }

  ngOnInit() {
    // getAllContacts selector from the main store allows us to monitor changes only on id list from the main state
    // without monitoring the rest of the state
    //this.contacts$ = this.store.select(fromContacts.getAllContacts);
    this.contacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));
    this.store.dispatch(new contactsActions.LoadAll());
  
    

  }
  
  search(query: string){
    this.store.dispatch(new contactsActions.Search(query));
  }

  editContact(contact: Contact) {
    this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
    this.router.navigate(['/contacts', contact.id, 'edit'])
  }

  showContact(contact: Contact) {
    this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
    this.router.navigate(['/contacts', contact.id])
  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new contactsActions.Delete(contact.id));
    }
  }

}
