import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Contact , ContactFilter, Project} from '@app-core/models';



import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as fromRoot from '@app-root-store';

import { selectMatchingContacts, getAvailableContacts } from '@app-contacts-store/reducers/contacts-reducer';

import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactsIndexComponent implements OnInit {
   displayedColumns = ['id', 'name', 'email', 'phone','isPending'];
   public contacts$: Observable<Contact[]>;
   public availableContacts$: Observable<Contact[]>;
   public isCheckable$: boolean;
   contactFilter$: ContactFilter = {
     searchText:'',
     isPending: false,
     selectedProjectId: 0,
   }
   
   public currentProject$: Project;
   public projects$: Project[];
 

  
  constructor(
      public store: Store<fromContacts.State>, 
      private router: Router, 
      private actR: ActivatedRoute) {
     
    }

  ngOnInit() {
    this.projects$ =[{id:1, name:'aaa'},{id:2, name:'bbb'},{id:3, name:'ccc'}];
    this.contactFilter$.selectedProjectId = this.projects$[0].id;
    this.isCheckable$ = false;
    this.contacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));
    this.store.dispatch(new contactsActions.LoadAll());
    //this.store.dispatch(new contactsActions.Search(this.contactFilter$));
    
  }
  
  searchContacts(event: ContactFilter) {
    this.currentProject$ = this.projects$.filter(r=>r.id == this.contactFilter$.selectedProjectId)[0];
    this.store.dispatch(new contactsActions.Search(event));
  }

  editContact(contact: Contact) {
    this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
    this.router.navigate(['/contractors', contact.id, 'edit'])
  }

  showContact(contact: Contact) {
    this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
    this.router.navigate(['/contractors', contact.id])
  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new contactsActions.Delete(contact.id));
    }
  }
}

