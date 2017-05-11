import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { CommentListComponent } from './comment-list/comment-list.component';

@Component({
  selector: 'client-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

  @Input() selectedClient;
  
  private commentTypes = [
    { type: 'Call', cssClass: 'glyphicon-earphone' },
    { type: 'Meeting', cssClass: 'glyphicon-calendar' },
    { type: 'Note', cssClass: 'glyphicon-pushpin' }
  ];
  private comments: Array<any> = [];
  private newComment: any = {
    message: '',
    commentType: 'Call',
  };
  private notification;
  constructor(private clientService: ClientService) {}

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedClient){
      console.log("Selected Client updated");
        this.clientService.getComments(this.selectedClient._id).subscribe((data) => {
          this.comments = data;
        });
        this.newComment.clientId = this.selectedClient._id;
    }
  }

  addComment() {
    this.newComment.isr = this.selectedClient.assignedTo;
    this.newComment.bdm = this.selectedClient.bdm;
    this.clientService.addComment(this.newComment).subscribe((data) => {
        if(data.success) {
          this.comments.unshift(data.comment);
          this.notification = null;
          this.newComment.message = '';
        }else{
          this.notification = { type: "Error", message: "Error occurred while adding a comment. Please try again." };
        }
        
    });
  }

  clear(){
      this.newComment.message = '';
  }

}
