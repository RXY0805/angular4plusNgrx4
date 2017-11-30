import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app-core/modules/shared.module';

import { ContactsRoutingModule } from './contacts-routing.module';
import { StoreModule } from '@ngrx/store';

import { ContactsComponent } from './contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactsIndexComponent } from './contacts-index/contacts-index.component';


import * as fromContacts from './store'
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './store/effects/contacts-effects';

import { initialState } from './store/reducers/search'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ContactsRoutingModule,
    StoreModule.forFeature('contacts', fromContacts.reducers),
    EffectsModule.forFeature([ContactsEffects])
  ],
  declarations: [
    ContactsComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactNewComponent,
    ContactsIndexComponent,
  ]
})
export class ContactsModule { }
