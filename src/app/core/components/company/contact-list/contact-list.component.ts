import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Contact } from '@app-core/models';

import { ContactsDatabase, ContactsDataSource } from './contacts.datasource';

import { MatPaginator, MatSort } from "@angular/material";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {

  public displayedColumns ;
  public contactsDatabase: ContactsDatabase;
  public dataSource : ContactsDataSource;
  public defaultPageSize: number;
  public invitedContactIds: string[]=[];

  @Input() contacts: Observable<Contact[]>;
  @Input() isCheckable: boolean;
  @Output() onToggleInviteContact = new EventEmitter()
  // @Output() onEdit = new EventEmitter<Contact>();
  // @Output() onShow = new EventEmitter<Contact>();
  // @Output() onDelete = new EventEmitter<Contact>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


 private paginatorSubscription: Subscription = Subscription.EMPTY
 private sortSubscription: Subscription = Subscription.EMPTY
 private query: string;
  contactsTrackByFn = (index: number, contact: Contact) => contact.id;

  constructor() {}

  ngOnInit() {
    this.defaultPageSize = this.isCheckable ? 5:10;
    this.displayedColumns = [ 'id', 'name', 'email', 'phone','isPending'];
    this.contactsDatabase = new ContactsDatabase(this.contacts);
    this.dataSource = new ContactsDataSource(this.contactsDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  toggleInviteContact(contactId) {
   
    var index = -1;

    if(this.invitedContactIds){
      index = this.invitedContactIds.indexOf(contactId);
    }
    
    if(index < 0){
      this.invitedContactIds.push(contactId);
    }
    else{
      this.invitedContactIds.splice(index,1);
    }

    this.onToggleInviteContact.emit(this.invitedContactIds);
  }

  
  // showDetails(contact: Contact) {
  //   this.onShow.emit(contact);
  // }

  // editContact(contact: Contact) {
  //   this.onEdit.emit(contact)
  // }

  // deleteContact(contact: Contact) {
  //   this.onDelete.emit(contact)
  // }

}
