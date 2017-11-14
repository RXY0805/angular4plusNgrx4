import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';
import { TestComponent } from './test/test.component';

import { ContactsModule } from './views/contacts/contacts.module';

// Fix Lazy loading routing issue
// https://github.com/angular/angular-cli/issues/3204

export function loadChildrenContact(){
    return ContactsModule;
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/test'
  },
  {
    path: 'contacts', loadChildren: loadChildrenContact
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
