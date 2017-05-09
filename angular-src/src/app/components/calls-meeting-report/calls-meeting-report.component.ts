import { Component, OnInit, Input,  OnChanges, SimpleChanges} from '@angular/core';
import { ReportService } from '../../services/report.service';
import * as ChartConfig from '../../config/column-chart-config';

const Highcharts = require("highcharts");

@Component({
  selector: 'app-calls-meeting-report',
  templateUrl: './calls-meeting-report.component.html',
  styleUrls: ['./calls-meeting-report.component.css']
})
export class CallsMeetingReportComponent implements OnInit {
	@Input()
  	filter: any;
	
	isLoading: Boolean = false;
	bdms: any;
	fromDate: any;
	toDate: any;
  	constructor(private reportService: ReportService) {	
  		
		  this.bdms = [];
		  // this is for one BDM, it will change
		  var bdm = JSON.parse(localStorage.getItem('user')).email
		  this.bdms.push(bdm);
		 
	}

	ngOnChanges() {
		if(this.filter) {
			this.fromDate = this.filter.fromDate;
			this.toDate = this.filter.toDate;
			this.populateUsersCallsToMeeting();
		}
	}

	ngOnInit() {
		
	}	

	populateUsersCallsToMeeting() {
		
		var filter = {
			bdm: this.bdms,
			fromDate: this.fromDate,
			toDate: this.toDate
		}
		this.isLoading = true;
		this.reportService.getCallsToMeeting(filter).subscribe(
		data => {
			this.isLoading = false;
			let config = ChartConfig.columnConfig;
			let result = this.reportService.parseDataForStackedChart(data);
			config.series = [
				result.meeting,
				result.calls
			];			
  			var chart = Highcharts.chart('chart', config);
			console.log(config);
		},
		err => {
			this.isLoading = false;
  		 	console.log(err);
		});
	} 

}
