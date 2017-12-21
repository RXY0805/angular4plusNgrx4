import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractorsComponent} from './contractors.component';
//import {ContactNewComponent} from './contact-new/contact-new.component';
import { ContractorIndex } from './views/contractor-index/contractor-index';

import {TitleResolver} from '@app-core/resolvers/title.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContractorsComponent,
    children: [
      {
        path: '',
        component: ContractorIndex,
        data: {title: 'New Contractors index eve'},
        resolve: {title: TitleResolver}
      },
    //   {
    //     path: 'new',
    //     component: ContactNewComponent,
    //     data: {title: 'New contact'},
    //     resolve: {title: TitleResolver}
    //   },
    //   {
    //     path: ':contactId',
    //     component: ContactDetailsComponent,
    //     data: {title: 'Contact details'},
    //     resolve: {title: TitleResolver}
    //   },
    //   {
    //     path: ':contactId/edit',
    //     component: ContactEditComponent,
    //     data: {title: 'Edit contact'},
    //     resolve: {title: TitleResolver}
    //   }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorsRoutingModule { }
