import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatTableModule,
  
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatTableModule,
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    
  ]
})
export class MaterialModule {}