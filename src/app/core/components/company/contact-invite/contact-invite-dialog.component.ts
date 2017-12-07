
import { Component, Inject } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
@Component({
    selector: 'contact-invite-dialog',
    styleUrls: ['contact-invite-dialog.component.css'],
    templateUrl: 'contact-invite-dialog.component.html',
  })
  export class ContactInviteDialog {
    public noneContractInvited: boolean;

    noneInvited(){
       return this.noneContractInvited;
    }
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
    constructor(public dialogRef: MatDialogRef<ContactInviteDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { 
        this.noneContractInvited = true;
    }
  
        onNoClick(): void {
            this.dialogRef.close();
        }

        getInvitedContactIds(contactInvited){
            
            this.noneContractInvited = !contactInvited;
        }
  }