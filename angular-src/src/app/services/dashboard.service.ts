import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

   getSalesData() {
    //var username = JSON.parse(localStorage.getItem('user')).username;
    var salesDataUrl = 'http://localhost:3000/clients/data/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(salesDataUrl)
      .map(res => res.json());
  }

   setAssignedTo(assignToBody) {
    //var username = JSON.parse(localStorage.getItem('user')).username;
    var salesDataUrl = 'http://localhost:3000/clients/assignto';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(salesDataUrl, assignToBody, {headers: headers})
      .map(res => res.json());
  }

}
