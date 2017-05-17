import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class MyTasksService {

  constructor(private http: Http) { }

  getMyTasks() {
      var email = JSON.parse(localStorage.getItem('user')).email;
      var salesDataUrl = environment.baseUrl+'clients//assignto/'+email;
      let headers =  new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.get(salesDataUrl)
        .map(res => res.json());
    }


    assignToBdm(assignToBdmBody) {
        var url = environment.baseUrl+'clients/bdm';
        let headers =  new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(url , assignToBdmBody, {headers: headers})
            .map(res => res.json());
        
    }

}
