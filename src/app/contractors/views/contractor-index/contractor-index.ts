import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Contractor , ContractorFilter, Project, ProjectInvitation, ProjectStatus, ProjectOnSiteStatus, AuditStatus} from '@app-core/models';



import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromContractors from '@app-store-contractor';
import * as contractorsActions from '@app-store-contractor/contractor-actions';
// import * as projectInvitationActions from '@app-contractors-store/actions/project-invitation-actions';
//import * as projectInvitationActions from '@app-contractors-store/actions/project-invitation-actions';
import * as fromRoot from '@app-root-store';

import { selectMatchingContractors, getAvailableContractors, getDuplicatedContractorIds } from '@app-store-contractor/contractor-reducers';

import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-contractor-index',
  templateUrl: './contractor-index.html',
  styleUrls: ['./contractor-index.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContractorIndex implements OnInit {
   public contractors$: Observable<Contractor[]>;
   public availableContractors$: Observable<Contractor[]>;
   public duplicatedContractorIds$: string[];
   public isCheckable$: boolean;

//    contractorFilter$: ContractorFilter = {
//      searchText:'',
    
//      selectedProjectId: 0,
     
   
     
//    }
   
   public currentProject$: Project;
   public projects$: Project[];
   public projectStatus$: ProjectStatus[];
   public projectOnSiteStatus$: ProjectOnSiteStatus[];
   public auditStatus$: AuditStatus[];
 
  constructor(
      public store: Store<fromContractors.State>, 
      private router: Router, 
      private actR: ActivatedRoute) {
         this.contractors$ = this.store.select(state => selectMatchingContractors(state.contractors.contractors));
        // this.availableContractors$= this.store.select(state => getAvailableContractors(state.contractors.contractors));
        //this.store.select(state => getDuplicatedContractorIds(state.contractors.contractors)).subscribe(res => this.duplicatedContractorIds$ = res as string[]);
        //debugger;
        this.store.dispatch(new contractorsActions.LoadAll());
        alert('load');
        debugger;
    }

  ngOnInit() {
    this.projects$ =[{id:1, name:'aaa'},{id:2, name:'bbb'},{id:3, name:'ccc'}];
    this.projectStatus$ =[{id:0, status: 'Invited'}, {id:1, status: 'Pending'},{id:2, status: 'Declined'},
                          {id:3, status: 'Accepted'}, {id:5, status: 'Terminated'}];
    this.auditStatus$ = [{id:0, status: 'For Review'}, {id:1, status: 'OK'}];
    this.projectOnSiteStatus$ = [{id:0, status: 'On site'}, {id:1, status: 'Off site'}];

    // this.contractorFilter$.selectedProjectId = this.projects$[0].id;
    // this.contractors$ = this.contractors$.map(contractors => contractors.filter( c => c.projectId == this.contractorFilter$.selectedProjectId));
    // this.availableContractors$ = this.availableContractors$.map(contractors => contractors.filter( c => c.projectId != this.contractorFilter$.selectedProjectId));
    // this.currentProject$ = this.projects$[0];
    // this.isCheckable$ = false;
  }
  
  searchContractors(event: ContractorFilter) {
    // this.currentProject$ = this.projects$.filter( r=>r.id == this.contractorFilter$.selectedProjectId)[0];
    // this.store.dispatch(new contractorsActions.Search(event));
  }

  // inviteContractor(event : ProjectInvitation){
  //   alert('send invitation');
  //   this.store.dispatch(new projectInvitationActions.Create(event));
  // }
  // editContractor(contractor: Contractor) {
  //   this.store.dispatch(new contractorsActions.SetCurrentContractorId(contractor.companyId));
  //   this.router.navigate(['/contractors', contractor.companyId, 'edit'])
  // }

  // showContractor(contractor: Contractor) {
  //   this.store.dispatch(new contractorsActions.SetCurrentContractorId(contractor.companyId));
  //   this.router.navigate(['/contractors', contractor.companyId])
  // }

  // deleteContractor(contractor: Contractor) {
  //   const r = confirm('Are you sure?');
  //   if (r) {
  //     this.store.dispatch(new contractorsActions.Delete(contractor.companyId));
  //   }
  // }
}

