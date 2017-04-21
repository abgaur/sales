import { Component, OnInit, Input } from '@angular/core';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  constructor() { }

  @Input() comments: Array<Object>;

  ngOnInit() {
  }

}
