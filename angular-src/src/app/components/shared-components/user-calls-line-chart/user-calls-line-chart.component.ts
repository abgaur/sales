import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
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

  empty: Boolean = false;
	isLoading: Boolean = false;
	bdms: Array<any> = [];
  isrs: Array<any> = [];
	fromDate: any;
	toDate: any;
  chart = null;

  constructor(private element:ElementRef, private reportService: ReportService) { }

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
    let type = this.element.nativeElement.getAttribute("type");
    let container = this.element.nativeElement.querySelector('.chart');
    this.reportService.getCallsReportForISR(filter).subscribe(
      data => {
        this.isLoading = false;
        let config = LineConfig.lineConfig;
        //console.log(Date.UTC(this.fromDate.year(), this.fromDate.month(), this.fromDate.date()));
        // console.log(Date.UTC(this.toDate.year(), this.toDate.month(), this.toDate.date()));
        config.chart.type = type;
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
        
        let result = this.reportService.parseDataForChart(data, type);
        config.series = [];  
        if(result){
          for(let prop in result){
            if(result.hasOwnProperty(prop)){
              config.series.push(result[prop]);
            }
          }  
          this.chart = Highcharts.chart(container, config);
        }else{
          this.empty = true;
          if(this.chart) this.chart.destroy();
        }


      },
      err => {
        this.isLoading = false;
           console.log(err);
    });
  }
  
}
