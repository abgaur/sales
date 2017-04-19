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
  private reminderText: String;
  private isReminderEnabled = false;
  private newComment = '';

  constructor(private clientService: ClientService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedClient){
        this.isReminderEnabled = !!this.selectedClient.reminder;
        if(this.isReminderEnabled){
          this.reminderDate = moment(this.selectedClient.reminder.date);
          this.reminderText = this.selectedClient.reminder.text;
        }else{
          this.reminderDate = moment();
          this.reminderText = '';
        }
    }
  }

  dateChange(date) {
    this.reminderDate = date;
    // var reminder = { date: "", text: "" };
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
    if(this.isReminderEnabled) {
      this.selectedClient.reminder = { date: this.reminderDate.toString(), text: this.reminderText };
    }else{
      this.selectedClient.reminder = null;
    }
  	this.clientService.updateClient(this.selectedClient).subscribe((data) => {
        this.clientUpdated.emit(data);
    });
  }

  clearReminder() {
    this.isReminderEnabled = !this.isReminderEnabled;
  }

}
