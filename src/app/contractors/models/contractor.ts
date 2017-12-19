export interface Contractor {
  companyId?: string;
  name: string;
  email: string;
  statusId: number;
  isOnSite: boolean;
  isAudit: boolean;
}

export interface PrincipleContractors {
  projectId: number;
  projectName: string;
  contractors: Contractor[];
}

export interface ContractorFilter {
  searchText: string;
  selectedProjectId: number;
  selectedProjectStatusId: number;
  isOnSite: boolean;
  isAudit: boolean;
}

export interface ProjectInvitation {
  id?: number;
  projectId: number;
  existContractIds?: string[];
  newContractorEmail?: string;
}
