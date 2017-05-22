import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class MyTasksService {

  headers: any;
  	constructor(private http: Http,
	  private authService: AuthService) {
		  this.authService.loadToken();
		  this.headers = new Headers();
		  this.headers.append('Content-type', 'application/json');
		  this.headers.append('Authorization', this.authService.authToken);		 
	  }


  getMyTasks() {
      var email = JSON.parse(localStorage.getItem('user')).email;
      var salesDataUrl = environment.baseUrl+'clients//assignto/'+email;
      return this.http.get(salesDataUrl, {headers: this.headers})
        .map(res => res.json());
    }


    assignToBdm(assignToBdmBody) {
        var url = environment.baseUrl+'clients/bdm';
        return this.http.post(url , assignToBdmBody, {headers: this.headers})
            .map(res => res.json());
        
    }

}
