import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Contact } from '@app-core/models';
import {Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class ContactsService {

  constructor(private http: HttpClient ) { }


  getAllContacts(): Observable<Contact[]> {
  
       return this.http.get<Contact[]>(`${environment.dataFolder}/company.json`)
       .map(res=> res);
    // call 3DSS api service 
    //  return this.http
    //      .get<Contact[]>(`${environment.appApi.baseUrl}/contacts`)

  }

  show(conactId: string): Observable<Contact> {
    return this.http
        .get<Contact>(`${environment.appApi.baseUrl}/contacts/${conactId}`)

  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.appApi.baseUrl}/contacts`, contact)
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${environment.appApi.baseUrl}/contacts/${contact.id}`, contact)
  }


  destroy(id: string): Observable<Contact> {
    return this.http.delete<Contact>(`${environment.appApi.baseUrl}/contacts/${id}`)
  }

}
