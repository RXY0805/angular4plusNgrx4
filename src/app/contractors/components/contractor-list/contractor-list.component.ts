import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Contractor } from '@app-core/models';

import { ContractorDatabase, ContractorDataSource } from './contractor.datasource';

import { MatPaginator, MatSort } from "@angular/material";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorListComponent implements OnInit {

  public displayedColumns ;
  public contractorsDatabase: ContractorDatabase;
  public dataSource : ContractorDataSource;
  public defaultPageSize: number;
  public invitedContractorIds: string[]=[];

  @Input() contractors: Observable<Contractor[]>;
  @Input() isCheckable: boolean;
  @Output() onToggleInviteContractor = new EventEmitter()
  // @Output() onEdit = new EventEmitter<Contractor>();
  // @Output() onShow = new EventEmitter<Contractor>();
  // @Output() onDelete = new EventEmitter<Contractor>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


 private paginatorSubscription: Subscription = Subscription.EMPTY
 private sortSubscription: Subscription = Subscription.EMPTY
 private query: string;
  contractorsTrackByFn = (index: number, contractor: Contractor) => contractor.companyId;

  constructor() {}

  ngOnInit() {
    // this.defaultPageSize = this.isCheckable ? 5:10;
    // this.displayedColumns = [ 'id', 'name', 'email', 'phone','isPending'];
    // this.contractorsDatabase = new ContractorDatabase(this.contractors);
    // this.dataSource = new ContractorDataSource(this.contractorsDatabase, this.paginator, this.sort);
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) { return; }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   });
  }

  toggleInviteContractor(contractorId) {
   
    var index = -1;

    if(this.invitedContractorIds){
      index = this.invitedContractorIds.indexOf(contractorId);
    }
    
    if(index < 0){
      this.invitedContractorIds.push(contractorId);
    }
    else{
      this.invitedContractorIds.splice(index,1);
    }

    this.onToggleInviteContractor.emit(this.invitedContractorIds);
  }

  
  // showDetails(contractor: Contractor) {
  //   this.onShow.emit(contractor);
  // }

  // editContractor(contractor: Contractor) {
  //   this.onEdit.emit(contractor)
  // }

  // deleteContractor(contractor: Contractor) {
  //   this.onDelete.emit(contractor)
  // }

}
