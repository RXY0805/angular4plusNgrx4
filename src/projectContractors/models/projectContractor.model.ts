  import {Contractor} from './contractor.model';


  export interface ContractorFilter {
    searchText: string;
    selectedProjectId: number;
    selectedStatusId: number;
    isOnSite: boolean;
    isAuditStatus: boolean;
  }
  
  export interface ProjectContractorInvitation {
    id?: number;
    projectId: number;
    existContractIds?: string[];
    newContractEmail?: string;
  }

  export interface ProjectContractor{
    id: number;
    projectName: string;
    contractors: Contractor[];
  }