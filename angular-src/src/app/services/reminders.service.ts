import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RemindersService {

  constructor(private http: Http) { }

   getReminders() {
    let assignTo = JSON.parse(localStorage.getItem('user')).email;
    let startDate = new Date();
    let endtDate = startDate;
    let remindersUrl = 'http://localhost:3000/clients/reminders/'+assignTo+'/'+startDate+'/'+endtDate;
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(remindersUrl)
      .map(res => res.json());
  }

}
