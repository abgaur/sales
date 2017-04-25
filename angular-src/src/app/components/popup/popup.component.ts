import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { ClientService } from '../../services/client.service';
import { UserService } from '../../services/user.service';

import { CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
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
  private dataService: CompleterData;
  private bdmName: String;
  private bdm: any;
  private stages: any; 

  constructor(private clientService: ClientService,
    private userService: UserService,
    private completerService: CompleterService) {
      var self= this;      
      this.userService.getBdms().subscribe( data => {
        self.dataService =  completerService.local(data, "name", "name").descriptionField("email");
      });
  }

  ngOnInit() {
      var self = this;
      this.userService.getStages().subscribe( data => {
        console.dir(data);
        self.stages = data;
      });
    
  } 

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedClient){
        this.bdmName = !!this.selectedClient.bdm ? this.selectedClient.bdm.name : '';
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
      if(this.reminderDate < moment()){
        alert("Invalid date");
        return;
      }
      this.selectedClient.reminder = { date: this.reminderDate.toString(), text: this.reminderText };
    }else{
      this.selectedClient.reminder = null;
    }
    this.selectedClient.bdm = this.bdm;
  	this.clientService.updateClient(this.selectedClient).subscribe((data) => {
      if(data.success){
        this.clientUpdated.emit(data);
      }else{
        alert('Error occurred while updating the client.');
      }
    });
  }

  clearReminder() {
    this.isReminderEnabled = !this.isReminderEnabled;
  }

  public onBdmSelected(selected: CompleterItem) {
    console.log(selected);
    if (selected) {
        this.bdm = { email: selected.description, name: selected.title }        
    } else {
        this.bdm = {};
    }
}

}
