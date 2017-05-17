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
			this.populateUserCalls();
		}
	}

  populateUserCalls() {
    var config = LineConfig.lineConfig;
    Highcharts.chart('chart', config);
  }

}
