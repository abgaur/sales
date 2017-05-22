import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable()
export class UploadService {
  
  constructor(private http:Http,
   private authService: AuthService) { }

  uploadXls(file) {
    this.authService.loadToken();
    let headers =  new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', this.authService.authToken);
    return this.http.post(environment.baseUrl+'clients/upload', file, {headers: headers})
      .map(res => res.json());      
  }
}
