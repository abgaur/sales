import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as ChartConfig from '../config/column-chart-config';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportService {

  constructor(private http: Http) { }

  getCallsToMeeting(filter) {
     
     
        var callsToMeetingUrl = environment.baseUrl+'teamdata/calltomeeting';
        let headers =  new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(callsToMeetingUrl, filter, {headers: headers})
          .map(res => res.json());     
    
  }

  parseDataForStackedChart(data){
      var resultSeries = { meeting: { name: 'Meeting', data: []}, calls: { name: 'Calls', data: []} };
      data.forEach((item) => {
        resultSeries.meeting.data.push({ name: item.name, y: item.meeting});
        resultSeries.calls.data.push({ name: item.name, y: item.totalCount});
      });
      return resultSeries;
    }

}
