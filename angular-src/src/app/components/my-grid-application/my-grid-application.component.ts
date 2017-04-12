import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { RedComponentComponent } from '../red-component/red-component.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { FlashMessagesService} from 'angular2-flash-messages';
import { DashboardService } from '../../services/dashboard.service'
import { CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {

  private gridOptions: GridOptions;
  private isrName: string;
 
  private searchStr: string;
  private dataService: CompleterData;
  private selectedClient: string;

    constructor(private dashboardService: DashboardService,
        private flashMessage: FlashMessagesService,
        private completerService: CompleterService
    ) {
        var self = this;

        this.dashboardService.getUsers().subscribe( data => {
            console.dir(data);
            self.dataService =  completerService.local(data, "name", "name").descriptionField("email");
        });
    
        this.gridOptions = {};
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
        this.gridOptions.columnDefs = [
            {
                headerName: "Actions",
                width: 150,
                field: "_id",
                cellRendererFramework: EditTaskComponent,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
                //cellRenderer: this.createEditButton;
            },

            {
                headerName: "First Name",
                field: "firstName",
                width: 100,
                sort: 'asc',
                filter: 'text',
                // headerCheckboxSelection: true,
                // headerCheckboxSelectionFilteredOnly: true,
                // checkboxSelection: true
            },
             {
                headerName: "Last Name",
                field: "lastName",
                width: 100,
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
                width: 120,
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
                width: 100
            }
        ];
        // setting up features for grid
        this.gridOptions.enableSorting = true;
        this.gridOptions.rowHeight =30
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

   selectClient(id) {
       this.selectedClient = id;       
    }


  getSalesData() {

     this.dashboardService.getSalesData().subscribe( data => {
        console.log('got data from service');
        this.gridOptions.api.setRowData(data);
    });

  }

  assignTo() {

    var assignToBody = {
        ids: [],
        assignTo: this.isrName
    };    
    assignToBody.ids = this.gridOptions.api.getSelectedNodes().map(function(rowNode) {return rowNode.data._id;});
    console.log(assignToBody);
    

    this.dashboardService.setAssignedTo(assignToBody).subscribe( (data) => {
      if(data.success) {
        this.flashMessage.show('Tasks are assigned', {cssClass: 'alert-success', timeout: 3000});
        
      } else {
        this.flashMessage.show('Something happened, check logs', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  // quick filter 
  onFilterChange(event) {
    console.log('ggg'+event.target.value);
    // this.values +=  this.values += event.target.value + ' | '; + ' | ';
    this.gridOptions.api.setQuickFilter(event.target.value);
  }

  // using for testing, or now please dont delete
  onPrintQuickFilterTexts() {
    // this.gridOptions.api.forEachNode((rowNode, index)=> {
    //     console.log('Row ' + index + ' quick filter text is ' + rowNode.quickFilterAggregateText);
    // });
}

public onAssignSelected(selected: CompleterItem) {
    console.log(selected);
        if (selected) {
            this.isrName = selected.description;
        } else {
            this.isrName = "";
        }
    }


}
