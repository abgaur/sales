import { Injectable, Component } from '@angular/core';

@Injectable()
export class NotificationService {
	private listeners: Object = {};

	constructor(){}
	
	attachListener(id: any, callback: Function){
		this.listeners[id] = callback;
	}

	show(id: any, title: String, details: Array<String>, timeout: Number, type, isModal = true){
		this.listeners[id](false, title, details, timeout, type, isModal);
	}

	showAllComponents(){
		console.log(this.listeners);
	}
}
