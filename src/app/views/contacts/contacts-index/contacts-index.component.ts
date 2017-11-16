import { ChangeDetectionStrategy, Component, ViewChild, OnInit} from '@angular/core';
import { Contact , ContactFilter} from '@app-core/models';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator } from "@angular/material";

import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as fromRoot from '@app-root-store';
//import { ContactsDatasource, ContactsDatabase } from './contacts.datasource';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription'

import { CollectionViewer, DataSource } from '@angular/cdk/collections'


import { selectMatchingContacts } from '@app-contacts-store/reducers/contacts-reducer';


import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';


//import { MatPaginator , MatTable, MatSort} from '@angular/material';



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
   }

   public contacts$: Observable<Contact[]>;
   //contactsDatabase : ContactsDatabase;
   contactsDatabase: ContactsDatabase;
   dataSource : ContactsDataSource;
   @ViewChild(MatPaginator) paginator: MatPaginator;
 

  private paginatorSubscription: Subscription = Subscription.EMPTY
  private sortSubscription: Subscription = Subscription.EMPTY
  
  constructor(
      public store: Store<fromContacts.State>, 
      private router: Router, 
      private actR: ActivatedRoute) {

      //this.contacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));
     // this.contactsDatabase = new ContactsDatabase(store);
     
    }

  ngOnInit() {
    
    
    this.store.dispatch(new contactsActions.LoadAll());
    this.contactsDatabase = new ContactsDatabase(this.store);
    this.dataSource = new ContactsDataSource(this.contactsDatabase, this.paginator);
  }
  
  searchContacts(event: ContactFilter) {
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

export class ContactsDatabase {
  constructor(private store: Store<fromContacts.State>) {

  }

    getRepoIssues(): Observable<Contact[]> {
   
        return this.store.select(state => selectMatchingContacts(state.contacts.contacts));
  }
}



export class ContactsDataSource extends DataSource<any> {
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  public constructor(private _contactsDatabase: ContactsDatabase, private paginator: MatPaginator) {
    super()
  }

  connect(): Observable<Contact[]> {
    const displayDataChanges = [
     // this.sort.sortChange,
      this.paginator.page
    ];

    // If the user changes the sort order, reset back to the first page.
   // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this._contactsDatabase.getRepoIssues()
      })
      .map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length;

        return data;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return Observable.of([]);
      });
  }

  public disconnect(): void {
  }
}
