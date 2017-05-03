import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

const Highcharts = require("highcharts");

@Component({
  selector: 'app-calls-meeting-report',
  templateUrl: './calls-meeting-report.component.html',
  styleUrls: ['./calls-meeting-report.component.css']
})
export class CallsMeetingReportComponent implements OnInit {
	isLoading: Boolean = false;

  	constructor(private reportService: ReportService) { 
  		this.isLoading = true;
  		reportService.getCallsToMeeting().then((config) => {
  			this.isLoading = false;
  			var chart = Highcharts.chart('chart', config);
			console.log(chart);
  		}).catch((err) => {
  			this.isLoading = false;
  			console.log(err);
  		});
	}

  	ngOnInit() {
  	}

}
