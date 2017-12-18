export interface Project {
    id: number;
    name: string;
  }

  export interface ProjectStatus {
    id: number;
    status: string;
  }

  export interface ProjectOnSiteStatus {
    id: number;
    status: string;
  }

  export interface AuditStatus {
    id: number;
    status: string;
  }

  export interface ProjectInvitation {
    id?: number;
    projectId: number;
    existContractIds?: string[];
    newContractEmail?: string;
  }
  
 