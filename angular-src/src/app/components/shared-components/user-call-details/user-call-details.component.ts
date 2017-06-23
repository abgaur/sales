import { Component, Input, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';

@Component({
  selector: 'app-user-call-details',
  templateUrl: './user-call-details.component.html',
  styleUrls: ['./user-call-details.component.css']
})
export class UserCallDetailsComponent implements OnInit {

  @Input() 
  details: Array<any> = [];
  gridOptions: GridOptions = {};

  constructor() { 
  this.gridOptions = {};
        this.gridOptions = {
            context: {
                componentParent: this
            }
        };
        this.gridOptions.columnDefs = [
            {
                headerName: "Client",
                field: "client.company",
                width: 150,
                filter: 'text'
            },
            {
                headerName: "First Name",
                field: "client.firstName",
                width: 150,
                filter: 'text'
            },
            {
                headerName: "Last Name",
                field: "client.lastName",
                width: 150,
                filter: 'text'
            },
            {
                headerName: "Calls",
                field: "calls",
                width: 100,
                filter: 'text'
            },
            {
                headerName: "Meetings",
                field: "meeting",
                width: 100,
                filter: 'text'
            },
            {
                headerName: "Total Calls",
                field: "totalCalls",
                width: 100,
                filter: 'text'
            }
        ];
        // setting up features for grid
        this.gridOptions.enableSorting = true;
        this.gridOptions.rowHeight =30
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.rowSelection = 'multiple';
        this.gridOptions.suppressRowClickSelection = true;
        this.gridOptions.rowData = [];
        // this.getMyTasks();

        var self = this;
        console.log()
        setTimeout(() => self.gridOptions.api.setRowData(this.details), 1000);
    }

  ngOnInit() {

  }

  ngOnChanges(){
  	if(this.details)
  		this.gridOptions.api.setRowData(this.details);
  }
}
