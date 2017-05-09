import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-meetings-scheduled',
  templateUrl: './meetings-scheduled.component.html',
  styleUrls: ['./meetings-scheduled.component.css']
})
export class MeetingsScheduledComponent implements OnInit {
	isLoading: Boolean = false;
	meetings: Array<any> = [];
	monthCounts: Array<any> = [];
	
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  	this.isLoading = true;
  	this.dashboardService.getMeetingsScheduled().then((data) => {
  			this.isLoading = false;
			this.meetings = data.clients;
  		}).catch((err) => {
  			this.isLoading = false;
  			console.log(err);
  		});

  	this.dashboardService.getMeetingsCount().then((data) => {
  			this.isLoading = false;
			this.monthCounts = data.counts;
  		}).catch((err) => {
  			this.isLoading = false;
  			console.log(err);
  		});
  }

}
