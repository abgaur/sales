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

  @Input() filter: any;
	@Input() selectedBdms: any;
  @Input() selectedIsrs: any;
  @Input() groupBy: any;

	isLoading: Boolean = false;
	bdms: Array<any> = [];
  isrs: Array<any> = [];
	fromDate: any;
	toDate: any;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if(this.filter) {
      console.log(this.filter);
      this.fromDate = this.filter.fromDate;
      this.toDate = this.filter.toDate;
    }
    if(this.selectedBdms) {
      this.bdms = [];
      this.bdms.push(this.selectedBdms.email);
    }
    if(this.selectedIsrs) {
      this.isrs = [];
      this.isrs.push(this.selectedIsrs.email);
    }
    if(this.fromDate &&  this.toDate && this.bdms.length > 0 && this.isrs.length > 0 && this.filter.type.groupBy){
      this.populateUserCalls();
    }
	}

  populateUserCalls() {
    var config = LineConfig.lineConfig;
    // Highcharts.chart('chart', config);

    var filter = {
      bdm: this.bdms,
      isr: this.isrs,
      fromDate: this.fromDate,
      toDate: this.toDate,
      groupBy: this.filter.type.groupBy
    }

    // this.isLoading = true;
  console.log(this.fromDate, this.toDate);
    this.reportService.getCallsReportForISR(filter).subscribe(
      data => {
        this.isLoading = false;
        let config = LineConfig.lineConfig;
        console.log(Date.UTC(this.fromDate.year(), this.fromDate.month(), this.fromDate.date()));
        console.log(Date.UTC(this.toDate.year(), this.toDate.month(), this.toDate.date()));
        config.xAxis = {
            type: "datetime",
            dateTimeLabelFormats: {
                day: '%b %e'
            },
            tickInterval: 24 * 3600 * 1000,
            minTickInterval: 24 * 3600 * 1000,
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
