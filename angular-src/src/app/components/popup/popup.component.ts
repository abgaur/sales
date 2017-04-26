import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { ClientService } from '../../services/client.service';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../notification/notification.service';
import * as NotificationEnumType from '../notification/notification-types';
import 'eonasdan-bootstrap-datetimepicker';
import * as moment from 'moment'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges {

  @Input() id;
  @Input() selectedClient;
  @Output() clientUpdated: EventEmitter<any> = new EventEmitter();
  
  private datetimepickerOptions = {
    //minDate: moment().startOf('day'),
    ignoreReadonly: true
  }
  private reminderDate = moment();
  private reminderText: String;
  private isReminderEnabled = false;
  private newComment = '';
  private notificationType = NotificationEnumType.NotificationType;

  constructor(
    private clientService: ClientService,
    private notificationService: NotificationService
  ) {}

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

    this.clientService.updateClient(this.selectedClient).subscribe(
      (data) => this.updateClientSuccess(data),
      (err) => this.updateClientFailure(err),
    );

  }
  
  private updateClientFailure(err: any){
    this.notificationService.show(
          'edit-popup-notification',
          'Error occurred while updating the client.', 
          null,
          5000, 
          this.notificationType.ERROR
        );
  }

  private updateClientSuccess(data){
    if(data.success){
        this.clientUpdated.emit(data);
        this.notificationService.show(
          'edit-popup-notification', 
          'Client updated successfully.', 
          null,
          5000, 
          this.notificationType.SUCCESS
        );
      }else{
        this.updateClientFailure(null);
      }
  }

  clearReminder() {
    this.isReminderEnabled = !this.isReminderEnabled;
  }

}
