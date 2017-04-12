import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class MyTasksService {

  constructor(private http: Http) { }

  getMyTasks() {
      var email = JSON.parse(localStorage.getItem('user')).email;
      var salesDataUrl = 'http://localhost:3000/clients//assignto/'+email;
      let headers =  new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.get(salesDataUrl)
        .map(res => res.json());
    }
    
  
  


  
  

}
