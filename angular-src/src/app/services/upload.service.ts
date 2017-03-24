import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UploadService {
  
  constructor(private http:Http) { }

  uploadXls(file) {
    let headers =  new Headers();
    
   headers.append('Content-Type', 'multipart/form-data');
  //headers.append('Content-type', 'application/json');
    console.log('test service');
    // let formData:FormData = new FormData();
    //     formData.append('uploadFile', 'C:\Users\eTouch\Downloads\Company dump.xlsx');
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'multipart/form-data');
    //     headers.append('Accept', 'application/json');
        //let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/clients/upload', file, {headers: headers})
      .map(res => res.json());      
  }
  

}
