import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  name: String;
  email: String;
  role: String;
  user: Object = {};

  constructor(private authService: AuthService,
              private clientService: ClientService) { 

   this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(profile.user);
    },
    err => {
      console.log(err);
      return false;
    });
 }

  ngOnInit() {}

 public roles = [
    { value: 'bdm', display: 'BDM' },
    { value: 'isr', display: 'ISR' } 
  ]

 onEditSubmit() {
    this.clientService.updateProfile(this.user).subscribe((data) => {
       });
 }

}
