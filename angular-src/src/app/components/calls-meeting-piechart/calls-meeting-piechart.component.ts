import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import * as ChartConfig from '../../config/column-chart-config';

const Highcharts = require("highcharts");


@Component({
  selector: 'app-calls-meeting-piechart',
  templateUrl: './calls-meeting-piechart.component.html',
  styleUrls: ['./calls-meeting-piechart.component.css']
})
export class CallsMeetingPiechartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
