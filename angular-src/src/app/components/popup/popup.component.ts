import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../services/client.service';
import 'eonasdan-bootstrap-datetimepicker';
import * as moment from 'moment'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() selectedClient;
  @Output() clientUpdated: EventEmitter<any> = new EventEmitter();
  
  private datetimepickerOptions = {
    minDate: moment(),
    ignoreReadonly: true
  }
  private reminderDate = moment();
  private newComment = '';
  private isReminderEnabled = false;

  constructor(private clientService: ClientService) {}

  ngOnInit() {}

  dateChange(date) {
    this.reminderDate = date;
  }

  addComment() {
    if(!this.selectedClient.comments){
      this.selectedClient.comments = [];
    }
    // { comment: , author: }
    this.selectedClient.comments.push(this.newComment);
    // this.clientService.addComment(this.newComment).subscribe();
  }

  updateClient(){
  	//console.log(this.selectedClient);
    this.selectedClient.reminderDate = this.isReminderEnabled ? this.reminderDate.toString() : null;
    // console.log(this.reminderDate);
  	this.clientService.updateClient(this.selectedClient).subscribe((data) => {
        this.clientUpdated.emit(data);
    });
  }

  clearReminder() {
    this.isReminderEnabled = !this.isReminderEnabled;
  }


}
