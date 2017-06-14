import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment'
import { DateTimePickerDirective } from 'ng2-eonasdan-datetimepicker/dist/datetimepicker.directive.js';
@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {

  @Output() filterDates: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(DateTimePickerDirective ) dp: DateTimePickerDirective ; 
  // @Output()
  // filterDates: EventEmitter<string> = new EventEmitter<number>();

  private dateTypes = [
    { type: 'Weekly', groupBy: 'day' },
    { type: 'Monthly', groupBy: 'day' },
    { type: 'Quarterly', groupBy: 'week' },
    { type: 'Custom', groupBy: 'day' }
  ];

  private selectedDateType: any  = this.dateTypes[0];

  private customFromDate = moment();
  private customToDate = moment();
  private fromDateOptions = {    
    format: 'D-MMM-YYYY',
    //maxDate: this.customToDate
  }
  private toDateOptions = {    
    format: 'D-MMM-YYYY',
    //minDate: this.customFromDate
    
  }
  private disableNextButtonFlag =true;
  private fromDate;
  private toDate;
  private currentDate;

  private dateText: String;

  constructor() {   
    
  }

  ngOnInit() {
     this.currentDate = moment();
     this.populateDateText(this.currentDate);
  }

  populateDateText(requiredDate) {
    
    if(this.selectedDateType.type === 'Weekly') {
      this.fromDate = requiredDate.clone().startOf('isoWeek');
      this.toDate = requiredDate.clone().endOf('isoWeek');
      this.dateText = this.fromDate.format('DD-MMM-YYYY') + ' to '+ this.toDate.format('DD-MMM-YYYY');
    } else if(this.selectedDateType.type === 'Monthly') {
      this.fromDate = requiredDate.clone().startOf('month');
      this.toDate = requiredDate.clone().endOf('month');
      this.dateText = this.fromDate.format('MMM-YYYY');
    }  else if(this.selectedDateType.type === 'Quarterly') {
      this.fromDate = requiredDate.clone().startOf('quarter');
      this.toDate = requiredDate.clone().endOf('quarter');
      this.dateText = 'Q'+requiredDate.quarter() + ' '+ requiredDate.year();;
    }

    this.filterDates.emit({
      'fromDate': this.fromDate.set({'hour':0, 'minute': 0, 'second': 0}), 
      'toDate': this.toDate.set({'hour':23, 'minute': 59, 'second': 59}),
       type: this.selectedDateType
    });
  }

  getPreviousData() {    
    
    if(this.selectedDateType.type === 'Weekly') {
      this.currentDate.subtract(7, 'd');
      this.populateDateText(this.currentDate);
    } else if(this.selectedDateType.type === 'Monthly') {
       this.currentDate.subtract(1, 'M');
       this.populateDateText(this.currentDate);
    } else if(this.selectedDateType.type === 'Quarterly') {
       this.currentDate.subtract(3, 'M');
       this.populateDateText(this.currentDate);
    } 
    this.enableNextButton();
   
  }

  getNextData() {
    if(this.disableNextButtonFlag) {
      return false;
    }

    if(this.selectedDateType.type === 'Weekly') {
      this.currentDate.add(7, 'd');
      this.populateDateText(this.currentDate);
    } else if(this.selectedDateType.type === 'Monthly') {
       this.currentDate.add(1, 'M');
       this.populateDateText(this.currentDate);
    } else if(this.selectedDateType.type === 'Quarterly') {
       this.currentDate.add(3, 'M');
       this.populateDateText(this.currentDate);
    }
    this.enableNextButton();
  }

  enableNextButton() {
    var latestDay = moment().dayOfYear();
    var latestYear = moment().year();
    var selectedDay = this.currentDate.dayOfYear();
    var selectedYear = this.currentDate.year();
   
    if (selectedDay<latestDay || selectedYear<latestYear) {
      this.disableNextButtonFlag = false;
    } else {
      this.disableNextButtonFlag = true;
    }
  }

  changeDateType(obj) {
    this.currentDate = moment();
    this.enableNextButton();
    if(this.selectedDateType.type!=='Custom') {
      this.populateDateText(this.currentDate);
    }
    
    
  }

  fromDateChanged(evt) {
    this.customFromDate = evt;    
  }
  toDateChanged(evt) {
    this.customToDate = evt;
  }

  getCustomDateData(){
     this.fromDate = this.customFromDate.set({'hour':0, 'minute': 0, 'second': 0});
     this.toDate = this.customToDate.set({'hour':23, 'minute': 59, 'second': 59});
     this.filterDates.emit({'fromDate': this.fromDate, 'toDate': this.toDate, type: this.selectedDateType});

  }

}