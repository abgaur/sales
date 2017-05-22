import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ClientService {

	headers: any;
  	constructor(private http: Http,
	  private authService: AuthService) {
		  this.authService.loadToken();
		  this.headers = new Headers();
		  this.headers.append('Content-type', 'application/json');
		  this.headers.append('Authorization', this.authService.authToken);
		 
	  }

	getDataById(id: String){
		const url = environment.baseUrl+`clients/${id}`;
  		return this.http.get(url, {headers: this.headers}).map((res) => res.json());
	}
	
	updateClient(client){
		const url = environment.baseUrl+'clients/';
		return this.http.post(url, client, { headers: this.headers }).map(res => res.json());
	}

	getComments(clientId){
		const url = environment.baseUrl+`comments/${clientId}`;
  		return this.http.get(url, {headers: this.headers}).map((res) => {
  			return res.json();
  		})
  		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	addComment(comment){
		const url = environment.baseUrl+`comments/add`;
		comment.user = JSON.parse(localStorage.getItem('user'));
  		return this.http.post(url, comment, {headers: this.headers}).map(res => res.json());
	}

	addClient(objClient:Object){
		const url = environment.baseUrl+'clients/add';
		return this.http.post(url, objClient, { headers: this.headers }).map(res => res.json());
	}

}
