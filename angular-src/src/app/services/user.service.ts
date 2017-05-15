import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers() {
    
    var allUsersUrl = environment.baseUrl+'users/all/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(allUsersUrl)
      .map(res => res.json());
  }

  getBdms() {    
    var bdmsUrl = environment.baseUrl+'users/bdm/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(bdmsUrl)
      .map(res => res.json());

  }

  getStages() {    
    var stagesUrl =environment.baseUrl+'stages/';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(stagesUrl)
      .map(res => res.json());

  }

}
