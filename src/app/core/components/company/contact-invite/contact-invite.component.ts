import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import { Component, Output, Input, EventEmitter, Inject, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
import { Store } from '@ngrx/store';
import { selectMatchingContacts, getAvailableContacts } from '@app-contacts-store/reducers/contacts-reducer';

import * as fromContacts from '@app-contacts-store'

import { ContactFilter,Contact, Project } from '@app-core/models';

@Component({
  selector: 'app-contact-invite',
  templateUrl: './contact-invite.component.html' ,
})
export class ContactInviteComponent {
    
    @Input() currentProject: Project
    availableContacts$: Observable<Contact[]>
    constructor(public dialog: MatDialog, public store: Store<fromContacts.State>){
        
    }

    ngOnInit() {
  
      this.availableContacts$ = this.store.select(state => getAvailableContacts(state.contacts.contacts));
      
      //this.store.dispatch(new contactsActions.LoadAll());
      //this.store.dispatch(new contactsActions.Search(this.contactFilter$));
      
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(ContactInviteDialog, {
            width: '850px',
            data: { projectId: this.currentProject.id, projectName: this.currentProject.name, availableContacts: this.availableContacts$ }
          });
    
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       // this.projectName = result;
      });
    }
}

@Component({
    selector: 'contact-invite-dialog',
    templateUrl: 'contact-invite-dialog.component.html',
  })
  export class ContactInviteDialog {
    

    constructor(
      public dialogRef: MatDialogRef<ContactInviteDialog>, 
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
