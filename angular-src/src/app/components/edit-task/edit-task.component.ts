import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular/main";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements ICellRendererAngularComp {
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  _id: string;
  constructor() { }

  ngOnInit() {
  }

    private params: any;

    agInit(params: any): void {
        this.params = params;     
    }

    editPopup() {
      this._id = this.params.value;      
      this.params.context.componentParent.selectClient(this._id);
    }
}
