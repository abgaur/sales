import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-data',
  templateUrl: './team-data.component.html',
  styleUrls: ['./team-data.component.css']
})
export class TeamDataComponent implements OnInit {

  private filterDates: any;
  private selectedBdm: any;
  private bdmSelected: any;  
  constructor() { }

  ngOnInit() {
    this.bdmSelected = JSON.parse(localStorage.getItem('user'));
  }

  bdmSelection(event){
    this.bdmSelected = event;   
  }

  sendDates(event) {
    console.log(event);
     this.filterDates = event;
  }

  
  


}
