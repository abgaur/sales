import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import * as LineConfig from '../../../config/line-chart-config';
import { ReportService} from '../../../services/report.service';
declare var moment;

const Highcharts = require("highcharts");
@Component({
  selector: 'app-user-calls-line-chart',
  templateUrl: './user-calls-line-chart.component.html',
  styleUrls: ['./user-calls-line-chart.component.css']
})
export class UserCallsLineChartComponent implements OnInit {

  @Input() data: any;
  @Input() groupBy: any;

  empty: Boolean = false;
	isLoading: Boolean = false;
  chart = null;

  constructor(private element:ElementRef, private reportService: ReportService) { }

  ngOnInit() {}

  ngOnChanges() {
    if(this.data && this.data.items && this.data.filter){
      let type = this.element.nativeElement.getAttribute("type");
      let items = this.data.items;
      let filter = this.data.filter;
      this.render(items, type, filter);
    }
	}

  render(items, type, filter) {
    console.log("render()", type, this.data);
    let config: any = LineConfig.lineConfig;
    let container = this.element.nativeElement.querySelector('.chart');
    let interval = 24 * ((filter.type.groupBy === 'week') ? 7 : 1);
    
    config.tooltip = {
        formatter: function () {
            if(filter.type.groupBy === 'week'){
              return "Week " + this.point._id + "<br/><b>" + this.series.name + ": " + this.y + "</b>";
            }
            else{
              return moment(this.point._id).format("MMM DD, YYYY") + "<br/><b>" + this.series.name + ": " + this.y + "</b>";
            }
        }
    }

    config.chart.type = type;
    config.xAxis = {
        type: "datetime",
        dateTimeLabelFormats: {
            day: '%b %e',
            week: '%b %e'
        },
        //tickInterval: interval * 3600 * 1000,
        //minTickInterval: 24 * 3600 * 1000,
        min: Date.UTC(filter.fromDate.year(), filter.fromDate.month(), filter.fromDate.date()),
        max: Date.UTC(filter.toDate.year(), filter.toDate.month(), filter.toDate.date()),
        labels: {
          rotation: -45,
          formatter: function () {
            let label = "";
            if(filter.type.groupBy === 'week'){
              let startDate = moment(this.value);
              let endDate = moment(startDate).add(6, "day");
              label = startDate.format("DD MMM") + '-' + endDate.format("DD MMM");
            }else{
              label = this.axis.defaultLabelFormatter.call(this);
            }
              
            return label;
          }
        }
      };

    if(filter.type.type === 'Custom'){
      config.xAxis.tickInterval = null;
      config.xAxis.minTickInterval = null;
    }else{
      config.xAxis.tickInterval = interval * 3600 * 1000;
      config.xAxis.minTickInterval = 24 * 3600 * 1000;
    }

    config.series = [];
    let result = this.reportService.parseDataForChart(items, type, filter.type.groupBy);

    if(result){
      this.empty = false;
      for(let prop in result){
        if(result.hasOwnProperty(prop)){
          config.series.push(result[prop]);
        }
      }  
      this.chart = Highcharts.chart(container, config);
    }else{
      this.empty = true;
      if(this.chart) {
        config.series = [];
        this.chart.update(config);
        //this.chart = null;
      }
    }

    /*var config = LineConfig.lineConfig;
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
    });*/
  }
  
}
