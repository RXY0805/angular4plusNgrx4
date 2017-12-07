
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import { Component, Output, Input, EventEmitter, Inject, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
import { Store } from '@ngrx/store';
import { selectMatchingContacts, getAvailableContacts } from '@app-contacts-store/reducers/contacts-reducer';

import * as fromContacts from '@app-contacts-store'

import { ContactFilter,Contact, Project } from '@app-core/models';

@Component({
    selector: 'contact-invite-dialog',
    styleUrls: ['contact-invite-dialog.component.css'],
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