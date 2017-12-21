import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as contractorActions from './contractor-actions';
import * as projectActions from '../project/project-actions';

import { Actions, Effect} from '@ngrx/effects';
import { Contractor, ProjectContractorInvitation } from '@app-core/models';
import { ContractorService } from 'app/shared/services/contractor.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class ContractorEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(contractorActions.LOAD_ALL) 
     // .startWith(new contractorActions.LoadAll())
      .switchMap((payload) =>
          this.contractorService.getAllContractors() 
      )
      .mergeMap((data:any)=>{
        return [ 
            new contractorActions.LoadAllSuccess(data.contractors),
            new projectActions.LoadAllSuccess(data.project)
        ];
      })
      //.map((contractor: Contractor[]) => new contractorActions.LoadAllSuccess(contractor));

     
  constructor(
      private actions$: Actions,
      private contractorService: ContractorService
  ) {}

}
