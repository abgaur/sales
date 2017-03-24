import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-uploadxls',
  templateUrl: './uploadxls.component.html',
  styleUrls: ['./uploadxls.component.css']
})
export class UploadxlsComponent implements OnInit {

  file: File;

 
  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit() {
  }

  onUploadSubmit() {
     const newFile = {
      file: this.file
    } 
    console.log('test angular');
   // this.uploadService.uploadXls(newFile);


     this.uploadService.uploadXls(this.file).subscribe( (data) => {
      if(data.success) {
        console.log('files uploaded');
        //this.flashMessage.show('You are registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/login']);
      } else {
        console.log('files not uploaded');
        //this.flashMessage.show('Something happened, check logs', {cssClass: 'alert-danger', timeout: 3000});
        //this.router.navigate(['/register']);
      }
    })

  }

}
