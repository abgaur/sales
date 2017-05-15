import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url:environment.baseUrl+'clients/upload/'+JSON.parse(localStorage.getItem('user')).email});
  constructor() { }

  ngOnInit() {
  }

}
