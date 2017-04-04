import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

   getSalesData() {
    var username = JSON.parse(localStorage.getItem('user')).username;
    var salesDataUrl = 'http://localhost:3000/clients/data/'+username;
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(salesDataUrl)
      .map(res => res.json());
  }

  authToken: any;
  user: any;

  getUpdatedDashboard(user) {
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());      
  }

  getProfile() {
    let headers =  new Headers();
    // this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

 updateProfile(user) {
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    // localStorage.setItem('id_token', token);
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());      
    // return;
  }

  // storeUserData(token, user) {
  //   localStorage.setItem('id_token', token);
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  // loadToken() {
  //   const token = localStorage.getItem('id_token');
  //   this.authToken = token;
  // }


}
