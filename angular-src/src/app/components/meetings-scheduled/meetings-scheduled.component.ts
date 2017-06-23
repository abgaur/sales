import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
declare var moment;

@Component({
  selector: 'app-meetings-scheduled',
  templateUrl: './meetings-scheduled.component.html',
  styleUrls: ['./meetings-scheduled.component.css']
})
export class MeetingsScheduledComponent implements OnInit {
	isLoading: Boolean = false;
	currentMonth: Array<any> = [];
	prevMonths: Array<any> = [];
	
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  	this.isLoading = true;
    
  	this.dashboardService.getMeetingsCount().subscribe((data) => {
    		this.isLoading = false;
        this.currentMonth = data.currentMonth;
        this.prevMonths = data.prevMonths;
  		});
  }

}
