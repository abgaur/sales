import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

   getSalesData() {
    var salesDataUrl = 'http://localhost:3000/clients/data/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(salesDataUrl)
      .map(res => res.json());
  }

   setAssignedTo(assignToBody) {
    var salesDataUrl = 'http://localhost:3000/clients/assignto';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(salesDataUrl, assignToBody, {headers: headers})
      .map(res => res.json());
  }

  getMeetingsCount(){
    var url = 'http://localhost:3000/teamdata/meetingsscheduled';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(url, { headers: headers })
      .map(res => {
        let counts = res.json();
        let currentMonth = counts.shift();
        let prevMonths = counts;
        return { currentMonth, prevMonths };
      });
  }

  getTopUsers(){
    var url = 'http://localhost:3000/teamdata/topusers';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(url, { headers: headers })
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
}
