
import { Component, Inject } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
import { Project, ProjectInvitation } from '@app-core/models';

import * as contactsActions from '@app-contacts-store/actions/contacts-actions';
import { selectMatchingContacts, getAvailableContacts, getDuplicatedContactIds } from '@app-contacts-store/reducers/contacts-reducer';

import { Store } from '@ngrx/store';
import * as fromContacts from '@app-contacts-store'

@Component({
    selector: 'contact-invite-dialog',
    styleUrls: ['contact-invite-dialog.component.css'],
    templateUrl: 'contact-invite-dialog.component.html',
  })
  export class ContactInviteDialog {
    public noneContractInvited: boolean;
    public isExistedEmail: boolean;
    public duplicatedContactIds: string[] = [];
    invitation : ProjectInvitation = {
        projectId: 0,
    };

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);

    
    constructor(public dialogRef: MatDialogRef<ContactInviteDialog>, @Inject(MAT_DIALOG_DATA) public data: any, public store: Store<fromContacts.State>) { 
        this.noneContractInvited = true;
        this.invitation.projectId = data.projectId;
        this.isExistedEmail = false;
    }
  
        onNoClick(): void {
            this.dialogRef.close();
        }

        getInvitedContactIds(invitedContactIds){
            this.invitation.existContractIds = invitedContactIds;
            this.noneContractInvited = !invitedContactIds;
        }

        onInvitation(): void {
            //dispatch create invitation action then post data to web api
            alert("please check console log");
            console.log(this.invitation);
            //alert(this.invitation.existContractIds.length);
           // alert( this.invitation.newContractEmail + this.invitation.projectId);
            //this.dialogRef.close();
        }

        triggerEmailSearch(value){

            if(!this.emailFormControl.errors){
                this.invitation.newContractEmail = value;
                this.store.select(state => getDuplicatedContactIds(state.contacts.contacts)).subscribe(res => this.duplicatedContactIds = res as string[]);
                this.store.dispatch(new contactsActions.CheckEmailExist(value));
                this.isExistedEmail = this.duplicatedContactIds.length>0;
            }
        }


  }