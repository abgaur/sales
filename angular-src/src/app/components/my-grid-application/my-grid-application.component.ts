import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { RedComponentComponent } from '../red-component/red-component.component'
import { FlashMessagesService} from 'angular2-flash-messages';
import { DashboardService } from '../../services/dashboard.service'

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {

  private gridOptions: GridOptions;
  private isrName: string;

    constructor(private dashboardService: DashboardService,
        private flashMessage: FlashMessagesService
    ) {
        this.gridOptions = {};
        // this.gridOptions.columnDefs = [
        //     {
        //         headerName: "ID",
        //         field: "id",
        //         width: 100
        //     },
        //     {
        //         headerName: "Value",
        //         field: "value",
        //         cellRendererFramework: RedComponentComponent,
        //         width: 100
        //     },

        // ];


        this.gridOptions.columnDefs = [
            {
                headerName: "First Name",
                field: "firstName",
                width: 200,
                sort: 'asc',
                filter: 'text',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
             {
                headerName: "Last Name",
                field: "lastName",
                width: 200,
                filter: 'text',
                getQuickFilterText: function(params) {
                    return params.value.name;
                }
            },
             {
                headerName: "Title",
                field: "title",
                width: 200,
                filter: 'text'
            },
            {
                headerName: "Assigned To",
                field: "assignedTo",
                width: 200,
                filter: 'text'
            },
            {
                headerName: "Email",
                field: "email",
                width: 200
            },
             {
                headerName: "phone",
                field: "phone",
                width: 200,

            },
            {
                headerName: "company",
                field: "company",               
                width: 200
            },
            {
                headerName: "Supervisor Name",
                field: "supervisor",
                width: 200
            },
            
             {
                headerName: "ManagementLevel",
                field: "managementLevel",
                width: 200
            },
             {
                headerName: "Etouch SL",
                field: "etouchSl",
                width: 200
            }
        ];
        // setting up features for grid
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.rowSelection = 'multiple';
        this.gridOptions.suppressRowClickSelection = true;
        //this.gridOptions.defaultColDef.checkboxSelection = this.isfirstColumn;
        //this.gridOptions.quickFilterText = true;
        this.gridOptions.rowData = [];
        this.getSalesData();       
    }

  ngOnInit() {
  }

   isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}


  getSalesData() {

     this.dashboardService.getSalesData().subscribe( data => {
        console.log('got data from service');
        //console.log(data);
        this.gridOptions.api.setRowData(data);
        //this.gridOptions.rowData = data;
      });

  }

  assignTo() {

    var assignToBody = {
        ids: [],
        assignTo: this.isrName
    };    
    assignToBody.ids = this.gridOptions.api.getSelectedNodes().map(function(rowNode) {return rowNode.data._id;});
    console.log(assignToBody.ids);


    this.dashboardService.setAssignedTo(assignToBody).subscribe( (data) => {
      if(data.success) {
        this.flashMessage.show('Tasks are assigned', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/login']);
      } else {
        //this.flashMessage.show('Something happened, check logs', {cssClass: 'alert-danger', timeout: 3000});
        //this.router.navigate(['/register']);
      }
    })

  }

  // quick filter 
  onFilterChange(event) {
    console.log('ggg'+event.target.value);
    // this.values +=  this.values += event.target.value + ' | '; + ' | ';
    this.gridOptions.api.setQuickFilter(event.target.value);
  }

  onPrintQuickFilterTexts() {
    // this.gridOptions.api.forEachNode((rowNode, index)=> {
    //     console.log('Row ' + index + ' quick filter text is ' + rowNode.quickFilterAggregateText);
    // });
}




}
