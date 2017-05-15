import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ClientService {

  	constructor(private http: Http) { }

	getDataById(id: String){
		const url = environment.baseUrl+`clients/${id}`;
  	return this.http.get(url).map((res) => res.json());
	}
	
	updateClient(client){
		const url = environment.baseUrl+'clients/';
		const headers = new Headers();
	  	headers.append('Content-type', 'application/json');

  		return this.http.post(url, client, { headers: headers }).map(res => res.json());
	}

	getComments(clientId){
		const url = environment.baseUrl+`comments/${clientId}`;
  		return this.http.get(url).map((res) => {
  			return res.json();
  		})
  		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	addComment(comment){
		const url = environment.baseUrl+`comments/add`;
		comment.user = JSON.parse(localStorage.getItem('user'));
  		return this.http.post(url, comment).map(res => res.json());
	}

    updateProfile(user:Object){
		console.log(user);
		const url = environment.baseUrl+'users/profile';
		const headers = new Headers();
	  	headers.append('Content-type', 'application/json');
  		return this.http.post(url, user, { headers: headers }).map(res => res.json());	
	}
}
