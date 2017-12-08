import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import { Component, Output, Input, EventEmitter, Inject, OnInit } from '@angular/core';
import { ContactInviteDialog } from './contact-invite-dialog.component';

import { MatDialog } from "@angular/material"
import { Store } from '@ngrx/store';

//import { selectMatchingContacts, getAvailableContacts } from '@app-contacts-store/reducers/contacts-reducer';

import * as fromContacts from '@app-contacts-store'

import { ContactFilter,Contact, Project } from '@app-core/models';

@Component({
  selector: 'app-contact-invite',
  // styleUrls: ['./contact-invite.component.css'],
  templateUrl: './contact-invite.component.html' ,
})
export class ContactInviteComponent {
    
    @Input() currentProject: Project
    availableContacts$: Observable<Contact[]>
    constructor(public dialog: MatDialog, public store: Store<fromContacts.State>){
        
    }

    ngOnInit() {
      this.availableContacts$ = this.store.select(state=> fromContacts.getAvailableContacts(state.contacts));
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(ContactInviteDialog, {
            width: '650px',
            data: { projectId: this.currentProject.id, projectName: this.currentProject.name, availableContacts: this.availableContacts$, isCheckable: true }
          });
    
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }
}


