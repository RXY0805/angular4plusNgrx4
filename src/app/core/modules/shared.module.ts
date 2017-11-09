import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ContactListComponent} from '../components/company/contact-list/contact-list.component';
import {ContactFormComponent} from '../components/company/contact-form/contact-form.component';
import {ContactDetailsContainerComponent} from '../components/company/contact-details/contact-details-container.component';
import {ContactSearchComponent} from '../components/company/contact-search/contact-search.component';

import {ContactsService} from '../services/contacts.service';

import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GroupsService} from '../services/groups.service';
import {RouterModule} from '@angular/router';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import {TitleResolver} from '../resolvers/title.resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ContactSearchComponent,
    ToolbarComponent
  ],
  exports: [
    ContactListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    ContactSearchComponent,
    RouterModule,
    ToolbarComponent
  ],
  providers: [ContactsService, GroupsService, TitleResolver]
})
export class SharedModule { }
