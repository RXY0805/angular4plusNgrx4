import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as contactActions from '../actions/contacts-actions';

import { Actions, Effect} from '@ngrx/effects';
import { Contact } from '@app-core/models';
import { ContactsService } from '@app-core/services/contacts.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class ContactsEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(contactActions.LOAD_ALL) 
     // .startWith(new contactActions.LoadAll())
      .switchMap((payload) =>
          this.contactsService.getAllContacts() 
      )
      .map((contacts: Contact[]) => new contactActions.LoadAllSuccess(contacts));

  @Effect()
  load$: Observable<Action> = this.actions$
      .ofType(contactActions.LOAD)
      .map( (action: contactActions.Load ) => action.payload)
      .switchMap((id) =>
          this.contactsService.show(id)
              .mergeMap( (contact: Contact) => {
                return [
                    new contactActions.LoadSuccess(contact),
                    new contactActions.SetCurrentContactId(contact.id)
                ]
              })
      );

      @Effect()
      create$: Observable<Action> = this.actions$
          .ofType(contactActions.CREATE)
          .map((action: contactActions.Create) => action.payload)
          .switchMap((contact) =>
              this.contactsService.create(contact)
                  .map( (createdContact: Contact) => new contactActions.CreateSuccess(createdContact))
                  .catch(error => Observable.of(new contactActions.CreateError(contact)))
          );

    // catch error fixed reference
    //https://github.com/ngrx/platform/issues/256
 @Effect()
 update$: Observable<Action> = this.actions$
            .ofType(contactActions.UPDATE)
            .map((action: contactActions.Update)=>action.payload)
            .switchMap((contact)=>
                this.contactsService.update(contact)
                    .map( (updatedContact: Contact) => new contactActions.UpdateSuccess(updatedContact))
                    .catch(error => Observable.of(new contactActions.UpdateError(error)))  
                    //.catch( () => of(new contactActions.UpdateError('ddd'))
            );

  @Effect()
  destroy$: Observable<Action> = this.actions$
      .ofType(contactActions.DELETE)
      .map((action: contactActions.Delete) => action.payload)
      .switchMap((id: string) =>
          this.contactsService.destroy(id)
              .map(() => new contactActions.DeleteSuccess(id))
      );

  constructor(
      private actions$: Actions,
      private contactsService: ContactsService
  ) {}


}
