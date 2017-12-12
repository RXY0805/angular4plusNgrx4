
import { Component, Inject } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
import { Project, ProjectInvitation } from '@app-core/models';

@Component({
    selector: 'contact-invite-dialog',
    styleUrls: ['contact-invite-dialog.component.css'],
    templateUrl: 'contact-invite-dialog.component.html',
  })
  export class ContactInviteDialog {
    public noneContractInvited: boolean;
    public isExistedEmail: boolean;
    invitation : ProjectInvitation = {
        projectId: 0,
    };

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);

    
    constructor(public dialogRef: MatDialogRef<ContactInviteDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { 
        this.noneContractInvited = true;
        this.invitation.projectId = data.projectId;
    }
  
        onNoClick(): void {
            this.dialogRef.close();
        }

        getInvitedContactIds(invitedContactIds){
            this.invitation.existContractIds = invitedContactIds;
            this.noneContractInvited = !invitedContactIds;
        }

        onInvitation(): void {
            
            //alert(this.invitation.existContractIds.length);
            alert( this.invitation.newContractEmail + this.invitation.projectId);
            //this.dialogRef.close();
        }

        triggerEmailSearch(value){
            if(!this.emailFormControl.errors){
                this.invitation.newContractEmail = value;
            }
            
        }


  }