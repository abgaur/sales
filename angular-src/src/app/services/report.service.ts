import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as ChartConfig from '../config/column-chart-config';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {

  constructor(private http: Http) { }

  getCallsToMeeting(bdm: any = null, user: any = null, from: any = null, to: any = null) {
    // todo: make http request to get data
    return new Promise((resolve, reject) => { 
      setTimeout(() => {
        let config = ChartConfig.columnConfig;
        const data = [
         {
           "name": "vinayak",
           "email": "v@etouch.net",
           "totalCount": 3,
           "calls": 3,
           "meeting": 0
         },
         {
           "name": "Ravi",
           "email": "ravi@etouch.net",
           "totalCount": 3,
           "calls": 1,
           "meeting": 2
         },
         {
           "name": "Amey",
           "email": "amey@etouch.net",
           "totalCount": 5,
           "calls": 4,
           "meeting": 1
         }
        ];
        let result = this.parseDataForStackedChart(data);
        config.series = [
            result.meeting,
            result.calls
        ];

        resolve(config);
      }, 2000);
      
    });


    /*
    var params = { bdm , from, to };
    // {
      "bdm" : ["ravi@etouch.net", "ashish@etouch.net"],
      "fromDate": "Thu Apr 27 2017 00:00:00 GMT-0700 (Pacific Daylight Time)",
      "toDate": "Sun May 28 2017 23:59:59 GMT-0700 (Pacific Daylight Time)"
    }
    */

    /*let url = 'localhost:3000/teamdata/callToMeeting';
    let headers =  new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', '<token>');
    return this.http.post(url, params)
      .map(res => res.json());*/
  }

  parseDataForStackedChart(data){
      var resultSeries = { meeting: { name: 'Meeting', data: []}, calls: { name: 'Calls', data: []} };
      data.forEach((item) => {
        resultSeries.meeting.data.push({ name: item.name, y: item.meeting});
        resultSeries.calls.data.push({ name: item.name, y: item.calls});
      });
      return resultSeries;
    }

}
