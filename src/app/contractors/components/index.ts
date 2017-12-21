import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContractorListComponent } from './contractor-list/contractor-list.component'
import { ContractorSearchComponent } from './contractor-search/contractor-search.component'
import { AppMaterialModule } from '../../app-material.module';
// import { BookAuthorsComponent } from './book-authors';
// import { BookDetailComponent } from './book-detail';
// import { BookPreviewComponent } from './book-preview';
// import { BookPreviewListComponent } from './book-preview-list';
// import { BookSearchComponent } from './book-search';

// import { PipesModule } from '../../shared/pipes';
// import { MaterialModule } from '../../material';

export const COMPONENTS = [
    ContractorListComponent,
    ContractorSearchComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AppMaterialModule,
    //PipesModule,
  ],
  declarations: COMPONENTS,
  exports:  COMPONENTS
})
export class SharedContractorComponentsModule {}
