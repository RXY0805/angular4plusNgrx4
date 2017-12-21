import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-contractors',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorsComponent {}
