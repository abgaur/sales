import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-data',
  templateUrl: './team-data.component.html',
  styleUrls: ['./team-data.component.css']
})
export class TeamDataComponent implements OnInit {

  private filterDates: any;
  constructor() { }

  ngOnInit() {
  }

  bdmSelected(event){
    console.log(event);
  }

  sendDates(event) {
    console.log(event);
     this.filterDates = event;
  }

  
  


}
