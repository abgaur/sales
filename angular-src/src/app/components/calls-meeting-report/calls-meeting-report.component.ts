import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import * as ChartConfig from '../../config/column-chart-config';

const Highcharts = require("highcharts");

@Component({
  selector: 'app-calls-meeting-report',
  templateUrl: './calls-meeting-report.component.html',
  styleUrls: ['./calls-meeting-report.component.css']
})
export class CallsMeetingReportComponent implements OnInit {
	isLoading: Boolean = false;
	bdms: any;

  	constructor(private reportService: ReportService) {
  		
  		
		  this.bdms = [];
		  // this is for one BDM, it will change
		  var bdm = JSON.parse(localStorage.getItem('user')).email
		  this.bdms.push(bdm);
		  this.populateUsersCallsToMeeting();
	}

	populateUsersCallsToMeeting() {
		var fromDate = new Date("Apr 10, 2017 11:13:00");
		var toDate = new Date("May 4, 2017 11:13:00");
		var filter = {
			bdm: this.bdms,
			fromDate: fromDate,
			toDate: toDate
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

  	ngOnInit() {
  	}

}
