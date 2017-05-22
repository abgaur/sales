import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  headers: any;
  	constructor(private http: Http,
	  private authService: AuthService) {
		  this.authService.loadToken();
		  this.headers = new Headers();
		  this.headers.append('Content-type', 'application/json');
		  this.headers.append('Authorization', this.authService.authToken);		 
	  }

  getUsers() {
    
    var allUsersUrl = environment.baseUrl+'users/all/';
    return this.http.get(allUsersUrl,  {headers: this.headers})
      .map(res => res.json());
  }

  getBdms() {
    var bdmsUrl = environment.baseUrl+'users/bdm/';
    return this.http.get(bdmsUrl,  {headers: this.headers})
      .map(res => res.json());

  }

  getStages() {    
    var stagesUrl =environment.baseUrl+'stages/';
    return this.http.get(stagesUrl,  {headers: this.headers})
      .map(res => res.json());
  }

  updateProfile(user: Object) {
    const url = environment.baseUrl + 'users/profile';
    return this.http.post(url, user, { headers: this.headers }).map(res => res.json());
  }
}
