import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '@app-root-store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  // Remove navigation toolbar 
  // <app-toolbar [title]="currentPageTitle$ | async" ></app-toolbar>
  template: `      
    <div class="container">
      <button mat-button routerLink="/contacts">Go to contacts</button>
      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  currentPageTitle$: Observable<string>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.currentPageTitle$ = this.store.select(fromRoot.getCurrentTitle);
  }
}
