import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ProjectInvitation } from '@app-core/models';
import {Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class ProjectInvitationsService {

  constructor(private http: HttpClient ) { }

  getAllProjectInvitations(): Observable<ProjectInvitation[]> {
  
    // call 3DSS api service 
     return this.http
         .get<ProjectInvitation[]>(`${environment.appApi.baseUrl}/projectInvitations`)

  }

//   show(conactId: string): Observable<ProjectInvitation> {
//     return this.http
//         .get<ProjectInvitation>(`${environment.appApi.baseUrl}/projectInvitations/${conactId}`)

//   }

  create(projectInvitation: ProjectInvitation): Observable<ProjectInvitation> {
      debugger;
    return this.http.post<ProjectInvitation>(`${environment.appApi.baseUrl}/projectInvitations`, projectInvitation)
  }

//   update(projectInvitation: ProjectInvitation): Observable<ProjectInvitation> {
//     return this.http.patch<ProjectInvitation>(`${environment.appApi.baseUrl}/projectInvitations/${projectInvitation.id}`, projectInvitation)
//   }


//   destroy(id: string): Observable<ProjectInvitation> {
//     return this.http.delete<ProjectInvitation>(`${environment.appApi.baseUrl}/projectInvitations/${id}`)
//   }

}
