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

  private reminderDate = moment();
  private newComment = '';

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
  	console.log(this.selectedClient);
  	this.clientService.updateClient(this.selectedClient).subscribe((data) => {
        this.clientUpdated.emit(data);
    });
  }
}
