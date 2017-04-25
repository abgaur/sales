import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers() {
    
    var allUsersUrl = 'http://localhost:3000/users/all/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(allUsersUrl)
      .map(res => res.json());
  }

  getBdms() {
    
    var bdmsUrl = 'http://localhost:3000/users/bdm/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(bdmsUrl)
      .map(res => res.json());

  }

}
