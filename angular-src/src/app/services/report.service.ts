import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as ChartConfig from '../config/column-chart-config';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReportService {

  headers: any;
  	constructor(private http: Http,
	  private authService: AuthService) {
		  this.authService.loadToken();
		  this.headers = new Headers();
		  this.headers.append('Content-type', 'application/json');
		  this.headers.append('Authorization', this.authService.authToken);		 
	  }

  getCallsToMeeting(filter) {
        var callsToMeetingUrl = environment.baseUrl+'teamdata/calltomeeting';
        return this.http.post(callsToMeetingUrl, filter, {headers: this.headers})
          .map(res => res.json());
  }

  getCallsReportForISR(filter){
      /*var callsToMeetingUrl = environment.baseUrl+'userdata/callReport';
        return this.http.post(callsToMeetingUrl, filter, {headers: this.headers})
          .map(res => res.json());*/

      let sub = new Subject<any>();
      setTimeout(() => sub.next(
        [
          {
              "_id": "2017-06-02",
              "totalCount": 1,
              "calls": 1,
              "meeting": 0
          },
          {
              "_id": "2017-06-04",
              "totalCount": 1,
              "calls": 1,
              "meeting": 0
          },
          {
              "_id": "2017-06-10",
              "totalCount": 1,
              "calls": 9,
              "meeting": 1
          },
          {
              "_id": "2017-06-11",
              "totalCount": 2,
              "calls": 10,
              "meeting": 0
          },
          {
              "_id": "2017-06-12",
              "totalCount": 15,
              "calls": 11,
              "meeting": 0
          },
          {
              "_id": "2017-06-13",
              "totalCount": 3,
              "calls": 12,
              "meeting": 1
          }]
      ));
      return sub;
  }

  parseDataForStackedChart(data){
      var resultSeries = { meeting: { name: 'Meeting', data: []}, calls: { name: 'Calls', data: []} };
      data.forEach((item) => {
        resultSeries.meeting.data.push({ name: item.name, y: item.meeting});
        resultSeries.calls.data.push({ name: item.name, y: item.calls});
      });
      return resultSeries;
    }

  parseDataForDateTimeChart(data){
      var resultSeries = { calls: { name: 'Calls', data: []} };
      data.forEach((item) => {
        // resultSeries.meeting.data.push({ x: new Date(item._id + " 00:00:00Z").getTime(), y: item.meeting});
        resultSeries.calls.data.push({ x: new Date(item._id + " 00:00:00Z").getTime(), y: item.calls});
      });
      return resultSeries;
  }

}
