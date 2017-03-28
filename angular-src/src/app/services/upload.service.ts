import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UploadService {
  
  constructor(private http:Http) { }

  uploadXls(file) {
    let headers =  new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post('http://localhost:3000/clients/upload', file, {headers: headers})
      .map(res => res.json());      
  }
  

}
