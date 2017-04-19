import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../services/client.service';
import 'eonasdan-bootstrap-datetimepicker';
import * as moment from 'moment'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges {

  @Input() selectedClient;
  @Output() clientUpdated: EventEmitter<any> = new EventEmitter();
  
  private datetimepickerOptions = {
    minDate: moment(),
    ignoreReadonly: true
  }
  private reminderDate = moment();
  private reminderTitle: String;
  private isReminderEnabled = false;
  private newComment = '';

  constructor(private clientService: ClientService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedClient){
        this.isReminderEnabled = !!this.selectedClient.reminderDate;
        if(this.selectedClient.reminderDate){
          this.reminderDate = moment(this.selectedClient.reminderDate);
          this.reminderTitle = this.selectedClient.reminderTitle;
        }else{
          this.reminderDate = moment();
          this.reminderTitle = '';
        }
    }
  }

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
    this.selectedClient.reminderDate = this.isReminderEnabled ? this.reminderDate.toString() : null;
  	this.clientService.updateClient(this.selectedClient).subscribe((data) => {
        this.clientUpdated.emit(data);
    });
  }

  clearReminder() {
    this.isReminderEnabled = !this.isReminderEnabled;
  }

}
