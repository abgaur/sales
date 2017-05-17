import { Component, OnInit, Injectable, Input } from '@angular/core';
import { NotificationService } from './notification.service';
import * as NotificationTypeEnum from './notification-types';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() private id;
  // @Input() private timeout;
  private hide: Boolean = true;
  private notifications = [];
  private title: String = '';
  private details: Array<String> = [];
  private notificationType = '';
  private timeout = null;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  	this.notificationService.attachListener(this.id, this.show.bind(this));
  	(<any>window).notificationService = this.notificationService;
  }

  close(){
  	this.hide = true;	
	this.title = '';	
	this.details = [];	
	this.notificationType = '';
	if(this.timeout) clearTimeout(this.timeout);
  }

  show(hide, title, details, autoCloseMillis, type, modal){
  	this.title = title;
  	this.details = details;
  	this.notificationType = type;
  	this.hide = false;
  	if(this.timeout) clearTimeout(this.timeout);
	if(autoCloseMillis){
		this.timeout = setTimeout(() => {
			this.hide = true;	
			this.title = '';	
			this.details = [];	
		}, autoCloseMillis);
	}
  }

  showDialog(){
	(<any>$(`#${this.id}_dialog`)).modal('show');
  }
}
