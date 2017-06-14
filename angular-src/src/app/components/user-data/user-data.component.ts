import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  private filterDates: any;
  private selectedBdm: any;
  private bdmSelected: any;  

  constructor() { }

  ngOnInit() {}

  bdmSelection(event){
    this.bdmSelected = event;
    console.log(event);
  }

  ngOnChanges(){
    //console.log(this.filter)
  }

  sendDates(event) {
    console.log(event);
     this.filterDates = event;
  }

}
