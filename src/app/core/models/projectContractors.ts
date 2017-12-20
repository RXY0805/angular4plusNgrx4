import { Project } from './project';

export interface Contractor {
    projectId: number;
    companyId?: number;
    name: string;
    email: string;
    statusId: number;
    onSite: boolean;
    auditStatus: boolean;
  }

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

  export interface ProjectContractors{
    project: Project;
    Contractors: Contractor[];
  }