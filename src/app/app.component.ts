import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '@app-root-store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  // Remove navigation toolbar 
  // <app-toolbar [title]="currentPageTitle$ | async" ></app-toolbar>
  template: ` 
  <!DOCTYPE html>
  <html>
  <head>
  
  </head>
  <body>   
    <div class="mat-app-background">
      <button mat-button routerLink="/contractors">Go to contacts</button>
      <router-outlet></router-outlet>
    </div>
    </body>
    </html>
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
