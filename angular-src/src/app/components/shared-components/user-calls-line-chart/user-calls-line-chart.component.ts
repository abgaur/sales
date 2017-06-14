import { Component, OnInit, Input,  OnChanges, SimpleChanges} from '@angular/core';
import * as LineConfig from '../../../config/line-chart-config';
import { ReportService} from '../../../services/report.service';

const Highcharts = require("highcharts");
@Component({
  selector: 'app-user-calls-line-chart',
  templateUrl: './user-calls-line-chart.component.html',
  styleUrls: ['./user-calls-line-chart.component.css']
})
export class UserCallsLineChartComponent implements OnInit {

  @Input()
  	filter: any;
	@Input()
    selectedBdms: any;

	isLoading: Boolean = false;
  users: any;
	bdms: any;
	fromDate: any;
	toDate: any;

  constructor(private reportService: ReportService) { 

    
      this.users = [];
		  // this is for one BDM, it will change
		  var user = JSON.parse(localStorage.getItem('user')).email
		  this.users.push(user);


  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if(this.filter) {
      this.fromDate = this.filter.fromDate;
      this.toDate = this.filter.toDate;
    }
    if(this.selectedBdms) {
      this.bdms = [];
      this.bdms.push(this.selectedBdms.email);
    }
    this.populateUserCalls();
	}

  populateUserCalls() {
    var config = LineConfig.lineConfig;
    // Highcharts.chart('chart', config);

    var filter = {
      bdm: this.bdms,
      fromDate: this.fromDate,
      toDate: this.toDate
    }

    // this.isLoading = true;
  console.log(this.fromDate, this.toDate);
    this.reportService.getCallsReportForISR(filter).subscribe(
      data => {
        this.isLoading = false;
        let config = LineConfig.lineConfig;
        config.xAxis = {
            type: "datetime",
            dateTimeLabelFormats: {
                day: '%e %b'
            },
            min: Date.UTC(this.fromDate.year(), this.fromDate.month(), this.fromDate.date()),
            max: Date.UTC(this.toDate.year(), this.toDate.month(), this.toDate.date())
        };
        
        let result = this.reportService.parseDataForDateTimeChart(data);
        config.series = [
          result.calls
        ];      
          var chart = Highcharts.chart('chart', config);
      },
      err => {
        this.isLoading = false;
           console.log(err);
    });
  }
  
}
