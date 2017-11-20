import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectModule } from 'angular2-select';

import { MatFormFieldModule, MatInputModule } from '@angular/material';



import { ContactListComponent } from '../components/company/contact-list/contact-list.component';
import { ContactFormComponent } from '../components/company/contact-form/contact-form.component';
import { ContactDetailsContainerComponent } from '../components/company/contact-details/contact-details-container.component';
import { ContactSearchComponent } from '../components/company/contact-search/contact-search.component';
import { ContactInviteComponent, ContactInviteDialog } from '../components/company/contact-invite/contact-invite.component';


import { ContactsService } from '../services/contacts.service';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GroupsService } from '../services/groups.service';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { TitleResolver } from '../resolvers/title.resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ContactSearchComponent,
    ContactInviteComponent,
    ContactInviteDialog,
    ToolbarComponent
  ],
  exports: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ContactSearchComponent,
    ContactInviteComponent,
    ContactInviteDialog,
    RouterModule,
    ToolbarComponent
  ],
  //entryComponents: [ContactInviteComponent, ContactInviteDialog],
  bootstrap:[ContactInviteComponent, ContactInviteDialog],
  providers: [ContactsService, GroupsService, TitleResolver]
})
export class SharedModule { }
