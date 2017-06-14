import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  private filterDates: any;
  private selectedBdm: any;
  private bdmSelected: any;  
  private bdms: Array<any> = [];
  private isrs: Array<any> = [];
  private isrSelected: any;  

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('user'));

    this.userService.getBdms().subscribe((data) => {
      this.bdms = data;
      if(currentUser.role === 'isr'){
        this.bdmSelected = this.bdms[0];
      }else{
        this.bdmSelected = currentUser;
      }
    });
    this.userService.getIsrs().subscribe((data) => {
      this.isrs = data;
      if(currentUser.role === 'isr'){
        this.isrSelected = currentUser;
      }else{
        this.isrSelected = this.isrs[0];
      }
    });
  }

  bdmSelection(event){
    this.bdmSelected = event;
    console.log(event);
  }

  isrSelection(event){
    this.isrSelected = event;
    console.log(event);
  }

  ngOnChanges(){
    //console.log(this.filter)
  }

  sendDates(event) {
    console.log("Event", event);
    this.filterDates = event;
  }

}
