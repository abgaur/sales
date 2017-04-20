import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RemindersService {

  constructor(private http: Http) { }

   getReminders() {
    let assignTo = JSON.parse(localStorage.getItem('user')).email;
    let startDate = new Date();
    let endDate = new Date();
    startDate.setHours(0,0,0);
    endDate.setHours(23,59,59);
    
    let remindersUrl = 'http://localhost:3000/clients/reminders/'+assignTo+'/'+startDate+'/'+endDate;
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(remindersUrl)
      .map(res => res.json());
  }

}
