import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-team-data',
  templateUrl: './team-data.component.html',
  styleUrls: ['./team-data.component.css']
})
export class TeamDataComponent implements OnInit {

  private filterDates: any;
  private selectedBdm: any;
  private bdmSelected: any;  
  private bdms: Array<any> = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getBdms().subscribe((data) => {
      this.bdms = data;
      this.bdmSelected = JSON.parse(localStorage.getItem('user'));
    });
    
  }

  bdmSelection(event){
    this.bdmSelected = event;   
  }

  sendDates(event) {
     this.filterDates = event;
  }

  
  


}
