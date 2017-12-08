export interface Project {
    id: number;
    name: string;
  }

  export interface ProjectInvitation {
    id?: number;
    projectId: number;
    existContractIds: string[];
    newContractEmail: string;
  }
  
 