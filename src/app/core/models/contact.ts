export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  isPending: boolean;
}

export interface ContactFilter {
  searchText: string;
  isPending: boolean;
}
