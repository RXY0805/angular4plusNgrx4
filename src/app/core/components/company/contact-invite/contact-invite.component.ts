import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import { Component, Output, Input, EventEmitter, Inject, OnInit } from '@angular/core';
import { ContactInviteDialog } from './contact-invite-dialog.component';

import { MatDialog } from "@angular/material"
import { Store } from '@ngrx/store';
import { selectMatchingContacts, getAvailableContacts } from '@app-contacts-store/reducers/contacts-reducer';

import * as fromContacts from '@app-contacts-store';


import { Contact, Project, ProjectInvitation } from '@app-core/models';

@Component({
  selector: 'app-contact-invite',
  // styleUrls: ['./contact-invite.component.css'],
  templateUrl: './contact-invite.component.html' ,
})
export class ContactInviteComponent {
    
    invitation: ProjectInvitation ={
      existContractIds: []=[],
      projectId: 0,
    }
    // contactFilter$: ContactFilter = {
    //   searchText:'',
    //   isPending: false,
    //   selectedProjectId: 0,
    // }
    @Input() currentProject: Project
    @Input() availableContacts:  Observable<Contact[]>
    @Output() onInvite : EventEmitter<ProjectInvitation> = new EventEmitter<ProjectInvitation>();

    constructor(public dialog: MatDialog, public store: Store<fromContacts.State>){
    }

    ngOnInit() {
      
    }

    openDialog(): void {
        this.invitation.projectId = this.currentProject.id;
        let dialogRef = this.dialog.open(ContactInviteDialog, {
            width: '650px',
            data: { projectId: this.currentProject.id, projectName: this.currentProject.name, availableContacts: this.availableContacts, 
                    isCheckable: true, invitation: this.invitation
                    //duplicatedContactIds: this.duplicatedContactIds 
                  }
          });
    
        dialogRef.afterClosed().subscribe(invitation => {
            if(invitation){
              this.onInvite.emit(invitation);
            }
            
          });
    }
}


