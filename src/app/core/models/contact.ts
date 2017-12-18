export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  isPending: boolean;
  projectId: number;
  //isInvited: boolean;
}

export interface ContactFilter {
  searchText: string;
  isPending: boolean;
  selectedProjectId: number;
  selectedProjectStatusId: number;
  selectedAuditStatusId: number;
  selectedProjectOnSiteStatusId: number;
}


