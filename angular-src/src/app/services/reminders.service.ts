import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class RemindersService {

   headers: any;
  	constructor(private http: Http,
	  private authService: AuthService) {
		  this.authService.loadToken();
		  this.headers = new Headers();
		  this.headers.append('Content-type', 'application/json');
		  this.headers.append('Authorization', this.authService.authToken);		 
	  }

   getReminders() {
    let assignTo = JSON.parse(localStorage.getItem('user')).email;
    let startDate = new Date();
    let endDate = new Date();
    startDate.setHours(0,0,0);
    endDate.setHours(23,59,59);
    
    let remindersUrl = environment.baseUrl+'clients/reminders/'+assignTo+'/'+startDate+'/'+endDate;
    return this.http.get(remindersUrl, {headers: this.headers})
      .map(res => res.json());
  }

}
