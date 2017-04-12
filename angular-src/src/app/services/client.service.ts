import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {

  	constructor(private http: Http) { }

	getDataById(id: String){
		const url = "http://localhost:3000/clients/task/" + id;
		const headers = new Headers();
		headers.append('Content-type', 'application/json');
    	return this.http.get(url, { headers: headers}).map(res => res.json());
    	// return { "_id":"58ed40c9f963062caca554d7","uploadedBy":"aparab","rainKingContactId":"2447653","salutation":"Mr.","firstName":"Sandeep 1","lastName":"Kulkarni","nickname":"","etouchSl":"Do-not-call","title":"Director, Data Services","managementLevel":"Mid-level manager","email":"sandeep_kulkarni1@symantec.com","address1":"350 Ellis Street","address2":"","city":"Mountain View","state":"CA","zip":"94043","country":"United States","phone":"+1 650-527-8000","extension":"6513144","supervisor":"Mark Sherwood","fax":"+1 408-252-4694","hasGatekeeper":"No","executive":"No","rainKingCompanyId":"11021","company":"Symantec Corporation","website":"http://www.symantec.com","sector":"Technology","industry":"Computer Services,Computer Software","duns":"64696941","allEmployees":"11000","itEmployees":"2509","managers":"752","revenue":"3.6","itBudget":"124.289108","fiscalYearEnd":"31-Mar","rank":"63","lastUpdatedDate":"12/17/16","notes":"","tags":"","status":"Undetermined","linkedInUrl":"https://www.linkedin.com/in/sandeep-kulkarni-2a863","twitterUrl":"","__v":0 };
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
