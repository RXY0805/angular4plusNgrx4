import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as projectInvitationsActions from '../actions/project-invitation-actions';


import {Actions, Effect} from '@ngrx/effects';
import { ProjectInvitation } from '@app-core/models';
import { ProjectInvitationsService } from '../../../../core/services/project-invitations.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ProjectInvitationsEffects {

  @Effect()
  create$: Observable<Action> = this.actions$
      .ofType(projectInvitationsActions.CREATE)
      .map((action: projectInvitationsActions.Create) => action.payload)
      .switchMap((projectInvitation) =>
          this.projectInvitationsService.create(projectInvitation)
              .map( (createdProjectInvitation: ProjectInvitation) => new projectInvitationsActions.CreateSuccess(createdProjectInvitation))
              .catch(error => Observable.of(new projectInvitationsActions.CreateError(projectInvitation)))
      );

  constructor(
      private actions$: Actions,
      private projectInvitationsService: ProjectInvitationsService
  ) {}
}
