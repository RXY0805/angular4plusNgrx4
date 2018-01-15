import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Response } from '@angular/http';

import * as projectContractorsActions from './project-contractors-actions';
import * as contractorsActions from '../contractor/contractor-actions';

import { Actions, Effect} from '@ngrx/effects';
import { Contractor, ProjectContractors } from '@app-core/models';
import { ContractorService } from 'app/shared/services/contractor.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class ProjectContractorsEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(projectContractorsActions.LOAD_ALL) 
     // .startWith(new contractorActions.LoadAll())
      .switchMap((payload) =>
          this.contractorService.getAllContractors()
          
          //.catch(error => of())
      )
      .map((res:ProjectContractors[])=> new projectContractorsActions.LoadAllSuccess(res));
      //.mergeMap((projectContractors: ProjectContractors[]) => new projectContractorsActions.LoadAllSuccess(projectContractors));
      //.flatMap((x:ProjectContractors[])=> new projectContractorsActions.LoadAllSuccess(x) );
      
     // .contractors.map((contractors: Contractor[])=> new contractorsActions.LoadAllSuccess(contractors) );
     // .map(x=>x)  ((projectContractors: ProjectContractors[]) => new projectContractorsActions.LoadAllSuccess(projectContractors));
     // .mergeMap((projectContractors: ProjectContractors[]) => new projectContractorsActions.LoadAllSuccess(projectContractors));

     
  constructor(
      private actions$: Actions,
      private contractorService: ContractorService
  ) {}

}
