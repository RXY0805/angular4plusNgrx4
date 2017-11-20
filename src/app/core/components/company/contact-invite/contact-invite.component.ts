import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"


import { ContactFilter, Project } from '@app-core/models';

@Component({
  selector: 'app-contact-invite',
  templateUrl: './contact-invite.component.html' ,
})
export class ContactInviteComponent {
    
    @Input() currentProject: Project
    constructor(public dialog: MatDialog){
        
    }

    openDialog(): void {
        debugger;
        let dialogRef = this.dialog.open(ContactInviteDialog, {
            width: '250px',
            data: { projectId: this.currentProject.id, projectName: this.currentProject.name }
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
      public dialogRef: MatDialogRef<ContactInviteDialog>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
