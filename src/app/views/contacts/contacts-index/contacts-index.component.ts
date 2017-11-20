import { ChangeDetectionStrategy, Component, ViewChild, OnInit} from '@angular/core';
import { Contact , ContactFilter, Project} from '@app-core/models';

import { ContactsDatabase, ContactsDataSource } from './contacts.datasource';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator, MatSort } from "@angular/material";

import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as fromRoot from '@app-root-store';






import { selectMatchingContacts } from '@app-contacts-store/reducers/contacts-reducer';



 import {Observable} from 'rxjs/Observable';
 import 'rxjs/add/operator/filter';
 import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactsIndexComponent implements OnInit {
   displayedColumns = ['id', 'name', 'email', 'phone'];
   
   contactFilter$: ContactFilter = {
     searchText:'',
     isPending: false,
     selectedProjectId: 0,
   }
   
   public currentProject$: Project;
   public projects$: Project[];
   public contacts$: Observable<Contact[]>;
   public invitingExistContacts$: Observable<Contact[]>;
   public contactsDatabase: ContactsDatabase;
   public dataSource : ContactsDataSource;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  private paginatorSubscription: Subscription = Subscription.EMPTY
  private sortSubscription: Subscription = Subscription.EMPTY
  
  constructor(
      public store: Store<fromContacts.State>, 
      private router: Router, 
      private actR: ActivatedRoute) {
     
    }

  ngOnInit() {
    this.projects$ =[{id:1, name:'aaa'},{id:2, name:'bbb'},{id:3, name:'ccc'}];
   
    //this.contactFilter$.selectedProjectId = this.projects$[0].id;
    this.contacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));
    this.store.dispatch(new contactsActions.LoadAll());
    this.contactsDatabase = new ContactsDatabase(this.contacts$);
    this.dataSource = new ContactsDataSource(this.contactsDatabase, this.paginator, this.sort);
  }
  
  searchContacts(event: ContactFilter) {
    this.currentProject$ = this.projects$.filter(r=>r.id == this.contactFilter$.selectedProjectId)[0];
    //this.invitingExistContacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));

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

