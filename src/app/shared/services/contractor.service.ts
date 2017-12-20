import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Contractor } from '@app-core/models';
import {Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class ContractorsService {

  constructor(private http: HttpClient ) { }


  getAllContractors(): Observable<Contractor[]> {
       
       return this.http.get<Contractor[]>(`${environment.dataFolder}/company.json`)
        .map(res=> res);
    // call 3DSS api service 
    //  return this.http
    //      .get<Contractor[]>(`${environment.appApi.baseUrl}/contractors`)

  }

  show(conactId: string): Observable<Contractor> {
    return this.http
        .get<Contractor>(`${environment.appApi.baseUrl}/contractors/${conactId}`)

  }

  create(contractor: Contractor): Observable<Contractor> {
    return this.http.post<Contractor>(`${environment.appApi.baseUrl}/contractors`, contractor)
  }


  update(contractor: Contractor): Observable<Contractor> {
    return this.http.patch<Contractor>(`${environment.appApi.baseUrl}/contractors/${contractor.companyId}`, contractor)
  }


  destroy(id: string): Observable<Contractor> {
    return this.http.delete<Contractor>(`${environment.appApi.baseUrl}/contractors/${id}`)
  }

}
