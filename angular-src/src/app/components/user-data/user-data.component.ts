import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  private filterDates: any;
  constructor() { 


    
  }

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
