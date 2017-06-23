import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as ChartConfig from '../config/column-chart-config';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
declare var moment ;
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

  getCallDetailsForISR(filter){
    var callsToMeetingUrl = environment.baseUrl+'userdata/callDetails';
    return this.http
                .post(callsToMeetingUrl, filter, {headers: this.headers})
                .map(res => res.json());

    /*let sub = new Subject<any>();
    setTimeout(() => sub.next(
        [
          {
              "client": {
                company: "Symantec",
                firstName: "FirstName",
                lastName: "LastName",
              },
              "totalCount": 1,
              "calls": 10,
              "meetings": 0
          },
          {
              "client": {
                company: "Symantec",
                firstName: "FirstName",
                lastName: "LastName",
              },
              "totalCount": 1,
              "calls": 3,
              "meetings": 0
          },
          {
              "client": {
                company: "Symantec",
                firstName: "FirstName",
                lastName: "LastName",
              },
              "totalCount": 1,
              "calls": 2,
              "meetings": 0
          }]
      ));
      return sub;*/
  }

  getCallsReportForISR(filter){
      var callsToMeetingUrl = environment.baseUrl+'userdata/callReport';
      return this.http
                .post(callsToMeetingUrl, filter, {headers: this.headers})
                .map(res => res.json());
  }

  parseDataForStackedChart(data){
      var resultSeries = { meeting: { name: 'Meeting', data: []}, calls: { name: 'Calls', data: []} };
      data.forEach((item) => {
        resultSeries.meeting.data.push({ name: item.name, y: item.meeting});
        resultSeries.calls.data.push({ name: item.name, y: item.calls});
      });
      return resultSeries;
    }

  parseDataForChart(data, type, groupBy){
    var resultSeries: any = {};
    if(type === 'pie'){
      resultSeries = { total: { name: "Total", data: [] }};
      let callCount = data.reduce((prev, curr) => prev + curr.calls, 0);
      let meetingsCount = data.reduce((prev, curr) => prev + curr.meeting, 0);

      if(callCount === 0 && meetingsCount === 0) { 
        resultSeries = null; 
      }else{
        resultSeries.total.data.push({ name: "Calls", y: callCount});
        resultSeries.total.data.push({ name: "Meetings", y: meetingsCount});
      }
    }else if(type === 'line'){
      resultSeries = { calls: { name: 'Total Calls', data: []} };

      if(data.length === 0){
        resultSeries = null;
      }
      data.forEach((item) => {
        // resultSeries.meeting.data.push({ x: new Date(item._id + " 00:00:00Z").getTime(), y: item.meeting });
        if(groupBy === 'week'){
          resultSeries.calls.data.push({ x: moment().day("Monday").week(item._id), y: item.totalCount, _id: item._id });
        }else{
          resultSeries.calls.data.push({ x: new Date(item._id + " 00:00:00Z").getTime(), y: item.totalCount, _id: item._id});
        }
        
      });
    }
    return resultSeries;
  }
}
