import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Contact , ContactFilter, Project, ProjectInvitation} from '@app-core/models';



import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as projectInvitationActions from '@app-contacts-store/actions/project-invitation-actions';
//import * as projectInvitationActions from '@app-contacts-store/actions/project-invitation-actions';
import * as fromRoot from '@app-root-store';

import { selectMatchingContacts, getAvailableContacts, getDuplicatedContactIds } from '@app-contacts-store/reducers/contacts-reducer';

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
   public duplicatedContactIds$: string[];
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
        this.contacts$ = this.store.select(state => selectMatchingContacts(state.contacts.contacts));
        this.availableContacts$= this.store.select(state => getAvailableContacts(state.contacts.contacts));
        //this.store.select(state => getDuplicatedContactIds(state.contacts.contacts)).subscribe(res => this.duplicatedContactIds$ = res as string[]);
        //debugger;
        this.store.dispatch(new contactsActions.LoadAll());
    }

  ngOnInit() {
    this.projects$ =[{id:1, name:'aaa'},{id:2, name:'bbb'},{id:3, name:'ccc'}];
    this.contactFilter$.selectedProjectId = this.projects$[0].id;
    this.contacts$ = this.contacts$.map(contacts => contacts.filter( c => c.projectId == this.contactFilter$.selectedProjectId));
    this.availableContacts$ = this.availableContacts$.map(contacts => contacts.filter( c => c.projectId != this.contactFilter$.selectedProjectId));
    this.currentProject$ = this.projects$[0];
    this.isCheckable$ = false;
  }
  
  searchContacts(event: ContactFilter) {
    this.currentProject$ = this.projects$.filter( r=>r.id == this.contactFilter$.selectedProjectId)[0];
    this.store.dispatch(new contactsActions.Search(event));
  }

  inviteContact(event : ProjectInvitation){
    alert('send invitation');
    this.store.dispatch(new projectInvitationActions.Create(event));
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

