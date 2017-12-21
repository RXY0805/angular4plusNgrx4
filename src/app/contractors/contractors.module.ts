import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { SharedModule } from '@app-core/modules/shared.module';

import { ContractorsRoutingModule } from './contractors-routing.module';
import { StoreModule } from '@ngrx/store';

import { ContractorsComponent } from './contractors.component';

// import { ContractorDetailsComponent } from './contractor-details/contractor-details.component';
// import { ContractorEditComponent } from './contractor-edit/contractor-edit.component';
// import { ContractorNewComponent } from './contractor-new/contractor-new.component';
import { ContractorIndex } from './views/contractor-index/contractor-index';


import * as fromContractors from '@app-core-store/contractor/index'
import { EffectsModule } from '@ngrx/effects';
import { ContractorEffects } from '@app-core-store/contractor/contractor-effects';
import { ContractorService } from '../shared/services/contractor.service';
//import { initialState } from './store/reducers/search'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    //SharedModule,
    ContractorsRoutingModule,
    StoreModule.forFeature('contractors', fromContractors.reducers),
    EffectsModule.forFeature([ContractorEffects])
  ],
  declarations: [
    ContractorsComponent,
    ContractorIndex
  ],
  providers: [ContractorService]
})
export class ContractorsModule { }
