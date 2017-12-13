
import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { Contact , ContactFilter, Project } from '@app-core/models';

import { MatPaginator, MatSort } from "@angular/material";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

export class ContactsDatabase {
    
      dataChange: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]) ;
      
      private dataStore: {
        contacts:  Contact[]
      }
    
      get data(): Contact[] {
        return this.dataChange.value;
      }
    
      setData(items: Contact[]){
        this.dataChange.next(items);
      }
    
      constructor(items: Observable<Contact[]>) {
    
         items.subscribe(res=>{
           this.setData(res);
         }, error=>console.log('could not load contacts'));
      }
    }
    
    
    export class ContactsDataSource extends DataSource<any> {
      
      _filterChange = new BehaviorSubject('');
      get filter(): string { return this._filterChange.value; }
      set filter(filter: string) { this._filterChange.next(filter); }
    
      filteredData: Contact[] = [];

      renderedData: Contact[] = [];
    
      public constructor(private _contactsDatabase: ContactsDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
        super();
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
      }
    
      connect(): Observable<Contact[]> {
        const displayDataChanges = [
          this._contactsDatabase.dataChange,
          this._paginator.page,
          this._sort.sortChange,
          this._filterChange,
        ];
    
        return Observable.merge(...displayDataChanges).map(() => {
          

          this.filteredData = this._contactsDatabase.data.slice().filter((item: Contact) => {
            let searchStr = (item.name + item.email).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) != -1;
          });


          const sortedData = this.sortData(this.filteredData.slice());
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          return this.renderedData;
        });
      }
    
      public disconnect(): void {
      }
    
      sortData(data: Contact[]): Contact[] {
        if (!this._sort.active || this._sort.direction == '') { return data; }
    
        return data.sort((a, b) => {
          let propertyA: number|string = '';
          let propertyB: number|string = '';
    
          switch (this._sort.active) {
            
            case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
           // case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
          }
    
          let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
    
          return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
      }
    }
    