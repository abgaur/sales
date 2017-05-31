import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public uploader:FileUploader;

  constructor(private authService: AuthService) { 
  	let currentUser = JSON.parse(localStorage.getItem('user')).email;
  	this.authService.loadToken();
  	this.uploader = new FileUploader({
  		url: `${environment.baseUrl}clients/upload/${currentUser}`,
  		authToken: this.authService.authToken
  	});
  }

  ngOnInit() {
  }

}
