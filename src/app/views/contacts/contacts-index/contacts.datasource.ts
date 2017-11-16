import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { Store } from '@ngrx/store';

import { selectMatchingContacts } from '@app-contacts-store/reducers/contacts-reducer';

import { MatPaginator } from '@angular/material'
import { Contact } from '@app-core/models';
import * as fromContacts from '@app-contacts-store'

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

export class ContactsDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  get data(): Contact[] { return this.dataChange.value; }

  constructor(public store: Store<fromContacts.State>,){
     this.store.select(state => selectMatchingContacts(state.contacts.contacts));
    
  }
}
export class ContactsDatasource extends DataSource<Contact> {
  public constructor(private _contactsDatabase: ContactsDatabase, private _paginator: MatPaginator) {
    super()
  }

  public connect(): Observable<Contact[]> {
    const displayDataChanges = [
      this._contactsDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._contactsDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  public disconnect(): void {
  }
}
