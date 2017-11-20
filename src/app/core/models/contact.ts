export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  isPending: boolean;
  projectId: number;
}

export interface ContactFilter {
  searchText: string;
  isPending: boolean;
  selectedProjectId: number;
}
