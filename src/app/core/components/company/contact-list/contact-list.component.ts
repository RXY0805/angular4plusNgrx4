import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Contact } from '@app-core/models';

import { ContactsDatabase, ContactsDataSource } from './contacts.datasource';

import { MatPaginator, MatSort } from "@angular/material";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {

  public displayedColumns ;
  public contactsDatabase: ContactsDatabase;
  public dataSource : ContactsDataSource;

  @Input() contacts: Observable<Contact[]>;
  @Input() isCheckable: boolean;
  // @Output() onEdit = new EventEmitter<Contact>();
  // @Output() onShow = new EventEmitter<Contact>();
  // @Output() onDelete = new EventEmitter<Contact>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 private paginatorSubscription: Subscription = Subscription.EMPTY
 private sortSubscription: Subscription = Subscription.EMPTY
  contactsTrackByFn = (index: number, contact: Contact) => contact.id;

  constructor() {}

  ngOnInit() {
    this.displayedColumns = [ 'id', 'name', 'email', 'phone','isPending', 'projectId'];
    this.contactsDatabase = new ContactsDatabase(this.contacts);
    this.dataSource = new ContactsDataSource(this.contactsDatabase, this.paginator, this.sort);
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
