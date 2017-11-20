import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';




import { ContactFilter, Project } from '@app-core/models';



@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html' ,
  styles: [
    `
    md-card-title,
    md-card-content,
    md-card-footer {
      display: flex;
      justify-content: center;
    }

    md-card-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    input {
      width: 300px;
    }

    md-card-spinner {
      padding-left: 60px; // Make room for the spinner
    }

    md-spinner {
      width: 30px;
      height: 30px;
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
    }

    md-spinner.show {
      opacity: 1.0;
    }
  `,
  ],
})
export class ContactSearchComponent {

  
  

  @Input() contactFilter: ContactFilter
  @Input() projects: Project[]

  @Input() searching = false;
  @Input() error = '';
  @Output() onSearch : EventEmitter<ContactFilter> = new EventEmitter<ContactFilter>();
  

  triggerFilter(value) {
    
    this.onSearch.emit(this.contactFilter);
  }
 
}
