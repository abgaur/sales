import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() private comment: any;
  private editComment: any = {};
  private editing: Boolean = false;
  private editError = "";
  private currentUser = JSON.parse(localStorage.getItem('user'));

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  handleClick(event){
    console.log(event.target);
    let fn = event.target.dataset.clickHandler;
    if(fn === 'cancelEditing'){
      this.cancelEditing();
    }else if(fn === 'edit'){
      this.edit();
    }else{
      this.startEditing();
    }
  }

  edit(){
    this.editComment._id = this.comment._id;
    this.editComment.isr = this.comment.assignedTo;
    this.editComment.bdm = this.comment.bdm;
    this.clientService.updateComment(this.editComment).subscribe((data) => {
        if(data.success) {
          this.comment = data.comment;
          this.cancelEditing();
          this.editError = "";
        }else{
          this.editError = "Error occurred while editing this comment. Please try again."
        }
    });
    
  }

  startEditing(){
    if(this.currentUser.email === this.comment.user.email){
      this.editComment.message = this.comment.message;
      this.editComment.commentType = this.comment.commentType;
      this.editError = "";
      this.editing = true; 
    }
  }

  cancelEditing(){
    this.editing = false;
    this.editComment = {};
    this.editError = "";
  }

  selectCommentType(event){
    let type = event.target.dataset.commentType;
    if(type) this.editComment.commentType = type;
  }

}
