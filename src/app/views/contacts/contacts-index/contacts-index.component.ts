import { ChangeDetectionStrategy, Component, ViewChild, OnInit} from '@angular/core';
import { Contact , ContactFilter} from '@app-core/models';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator, MatSort } from "@angular/material";

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
   contactsDatabase: ContactsDatabase;
   dataSource : ContactsDataSource;

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
    
    this.contacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));
    this.store.dispatch(new contactsActions.LoadAll());
    this.contactsDatabase = new ContactsDatabase(this.contacts$);
    this.dataSource = new ContactsDataSource(this.contactsDatabase, this.paginator, this.sort);
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

  dataChange: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]) ;
  
  private dataStore: {
    contacts:  Contact[]
  }

  get data(): Contact[] {
    return this.dataChange.value;
  }

  setData(items: Contact[]){
    this.dataChange.next(items);
  }

  constructor(items: Observable<Contact[]>) {

     items.subscribe(res=>{
       this.setData(res);
      // this.dataStore.contacts = data;
       //this.dataChange.next(Object.assign({}, this.dataStore).contacts);
     }, error=>console.log('could not load contacts'));
     
  }

}


export class ContactsDataSource extends DataSource<any> {
  
  renderedData: Contact[] = [];

  public constructor(private _contactsDatabase: ContactsDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
    super()
  }

  connect(): Observable<Contact[]> {
    const displayDataChanges = [
      this._contactsDatabase.dataChange,
      this._paginator.page,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._contactsDatabase.data.slice();

      const sortedData = this.sortData(data.slice());

      
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
           return this.renderedData;
    });
  }

  public disconnect(): void {
  }

  sortData(data: Contact[]): Contact[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
       // case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
       
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
