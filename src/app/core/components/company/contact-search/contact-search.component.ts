import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { ContactFilter, Project, ProjectStatus, ProjectOnSiteStatus, AuditStatus } from '@app-core/models';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html' ,
  styles: ['./contact-search.component.css'],
})
export class ContactSearchComponent {

  @Input() contactFilter: ContactFilter
  @Input() projects: Project[]
  @Input() projectStatus: ProjectStatus[]
  @Input() auditStatus: AuditStatus[]
  @Input() projectOnSiteStatus: ProjectOnSiteStatus[]

  @Input() searching = false;
  @Input() error = '';
  @Output() onSearch : EventEmitter<ContactFilter> = new EventEmitter<ContactFilter>();
  
  selectChange(){
    alert(this.contactFilter.selectedProjectId)
  }
  triggerFilter() {
    this.onSearch.emit(this.contactFilter);
  }
}
