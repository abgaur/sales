import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {

  	constructor(private http: Http) { }

	getDataById(id: String){
		const url = `http://localhost:3000/clients/task/${id}`;
  	return this.http.get(url).map((res) => res.json());
	}

  addComment(comment){
		const url = "http://localhost:3000/clients/comment";
		const username = JSON.parse(localStorage.getItem('user')).username;
		const headers = new Headers();
		headers.append('Content-type', 'application/json');

		const data = { comment: comment, author: username };
    return this.http.post(url, data, { headers: headers }).map(res => res.json());

	}

	updateClient(client){
		const url = "http://localhost:3000/clients/task";
		const username = JSON.parse(localStorage.getItem('user')).username;
		const headers = new Headers();
	  headers.append('Content-type', 'application/json');

  	return this.http.post(url, client, { headers: headers }).map(res => res.json());
	}
}
