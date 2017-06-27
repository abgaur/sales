import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
declare var moment;

@Component({
  selector: 'app-top-callers',
  templateUrl: './top-callers.component.html',
  styleUrls: ['./top-callers.component.css']
})
export class TopCallersComponent implements OnInit {
  isLoading: Boolean = false;
  callers: Array<any> = [];
  today = moment();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  	this.isLoading = true;

  	this.dashboardService.getTopUsers().subscribe((data) => {
		this.isLoading = false;
		this.callers = data;
  		});
  }

}
