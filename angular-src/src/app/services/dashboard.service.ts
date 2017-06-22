import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class DashboardService {

  headers: any;
  	constructor(private http: Http,
	  private authService: AuthService) {
		  this.authService.loadToken();
		  this.headers = new Headers();
		  this.headers.append('Content-type', 'application/json');
		  this.headers.append('Authorization', this.authService.authToken);		 
	  }

   getSalesData() {
    var role = JSON.parse(localStorage.getItem('user')).role;
    var salesDataUrl = environment.baseUrl+'clients/data/'+role;
   
    return this.http.get(salesDataUrl, {headers: this.headers})
      .map(res => res.json());
  }

   setAssignedTo(assignToBody) {
    var salesDataUrl = environment.baseUrl+'clients/assignto';
    return this.http.post(salesDataUrl, assignToBody, {headers: this.headers})
      .map(res => res.json());
  }

  getMeetingsCount(){
    var url = environment.baseUrl+'teamdata/meetingsscheduled';
    return this.http.get(url, { headers: this.headers })
      .map(res => {
        let counts = res.json();
        let currentMonth = counts.shift();
        let prevMonths = counts;
        return { currentMonth, prevMonths };
      });
  }

  getTopUsers(){
    var url = environment.baseUrl+'teamdata/topusers';
    return this.http.get(url, { headers: this.headers })
      .map(res => res.json());
  }

  getMeetingsScheduled() {

    var data = {
      clients: [
        {
          "company": "Symantec",
          "name": "Mark  Sherwood",
          "isr": "ISR",
          "bdm": "BDM"
        },
        {
          "company": "Symantec",
          "name": "Andrew  Gardner",
          "isr": "ISR",
          "bdm": "BDM"
        },
        {
          "company": "Symantec",
          "name": "Mannie  Heer",
          "isr": "ISR",
          "bdm": "BDM"
        },
        {
          "company": "Symantec",
          "name": "Andrew  Gardner",
          "isr": "ISR",
          "bdm": "BDM"
        },
        {
          "company": "Symantec",
          "name": "Mannie  Heer",
          "isr": "ISR",
          "bdm": "BDM"
        },
        {
          "company": "Symantec",
          "name": "Andrew  Gardner",
          "isr": "ISR",
          "bdm": "BDM"
        },
        {
          "company": "Symantec",
          "name": "Mannie  Heer",
          "isr": "ISR",
          "bdm": "BDM"
        }
      ]
      
    }

    return new Promise<any>((resolve, reject) => {
      setTimeout(() => resolve(data), 3000);
    });

    /*var salesDataUrl = 'http://localhost:3000/clients/data/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(salesDataUrl)
      .map(res => res.json());*/
  }

  removeClients(deleteBody) {
    var salesDataUrl = environment.baseUrl+'clients/';
    return this.http.delete(salesDataUrl, {body: deleteBody, headers: this.headers})
      .map(res => res.json());
  }
}
