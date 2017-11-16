import { ChangeDetectionStrategy, Component, ViewChild, OnInit} from '@angular/core';
import { Contact , ContactFilter} from '@app-core/models';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as fromRoot from '@app-root-store';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription'

import { selectMatchingContacts } from '@app-contacts-store/reducers/contacts-reducer';

import { ContactsDatasource } from './contacts.datasource'
//import { MatPaginator, MatSort, MatTableDataSource , MatTableModule } from "@angular/material"
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material'



@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactsIndexComponent implements OnInit {
   displayedColumns = ['id', 'name', 'email', 'ph'];
   dataSource: ContactsDatasource;
  
   contactFilter$: ContactFilter = {
     searchText:'',
     isPending: false,
   }

   allContacts$: Observable<Contact[]>;
   filteredContacts$: Observable<Contact[]>;
   loading$: Observable<boolean>;
   error$: Observable<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private paginatorSubscription: Subscription = Subscription.EMPTY
  private sortSubscription: Subscription = Subscription.EMPTY
  
  
  constructor(
      public store: Store<fromContacts.State>, 
      private router: Router, 
      private actR: ActivatedRoute) {

      this.allContacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));
   }

  ngOnInit() {
    // getAllContacts selector from the main store allows us to monitor changes only on id list from the main state
    // without monitoring the rest of the state
    //this.contacts$ = this.store.select(fromContacts.getAllContacts);
    
    this.store.dispatch(new contactsActions.LoadAll());
    //this.allContacts$.map(each=>each.filter(c=>c.isPending));
    //this.contacts$ = this.store.select(state => selectAllActiveContacts(state.contacts.contacts));
    // this.paginatorSubscription = this.paginator.page.subscribe((pageEvent: PageEvent) => {
    //   this.store.dispatch(new contactsActions.LoadAll());
    //   //pageEvent.pageIndex, pageEvent.pageSize
    // })
   
    // this.sortSubscription = this.sort.sortChange.subscribe((sort: Sort) => {
    //   // in case of sorting start with page 1 (pageIndex=0)
    // //his.store.dispatch(new contactsActions.LoadAll(0, this.paginator.pageSize || 25, sort.active, sort.direction))

    // })

    // this.dataSource = new ContactsDatasource(this.contacts$);
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
