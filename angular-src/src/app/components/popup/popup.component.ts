import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../services/client.service';
import 'eonasdan-bootstrap-datetimepicker';

declare var moment: any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() selectedClient = { comments: [] };
  @Output() clientUpdated: EventEmitter<any> = new EventEmitter();
  // selectedClient = { comments: null };
  reminderDate = moment();
  newComment = '';

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    /*if(this.selectedClientId){
      this.clientService.getDataById(this.selectedClientId).subscribe((data) => {
        this.selectedClient = data;
        this.selectedClient.comments = ['Test 1', 'Test 2', 'Test 3', 'Test 4','Test 1', 'Test 2', 'Test 3', 'Test 4'];
      });
    }*/
  }

  dateChange(date) {
    this.reminderDate = date;
  }

  addComment() {
    if(!this.selectedClient.comments){
      this.selectedClient.comments = [];
    }
    this.selectedClient.comments.push(this.newComment);
    // this.clientService.addComment(this.newComment).subscribe();
  }

  updateClient(){
  	console.log(this.selectedClient);
  	this.clientService.updateClient(this.selectedClient).subscribe((data) => {
        this.clientUpdated.emit(data);
      });
  }
}
