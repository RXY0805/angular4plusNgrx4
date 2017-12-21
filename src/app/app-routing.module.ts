import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';
import { TestComponent } from './test/test.component';

import { ContactsModule } from './views/contacts/contacts.module';
import { ContractorsModule } from './contractors/contractors.module';

// Fix Lazy loading routing issue
// https://github.com/angular/angular-cli/issues/3204

export function loadContactsChildrenContact(){
    return ContactsModule;
}

export function loadContractorsChildrenContact(){
  return ContractorsModule;
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/contractors'
  },
  {
    path: 'contractors', loadChildren: loadContractorsChildrenContact
  },
  {
    path: 'contacts', loadChildren: loadContactsChildrenContact
  },
  {
    path: 'test', component: TestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
