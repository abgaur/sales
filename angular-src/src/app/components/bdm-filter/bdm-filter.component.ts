import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bdm-filter',
  templateUrl: './bdm-filter.component.html',
  styleUrls: ['./bdm-filter.component.css']
})
export class BdmFilterComponent implements OnInit {
  bdms: Array<any> = [];
  @Input() cssClass: String = '';
  @Input() showAllOption: Boolean = false;
  @Input() selectedBDM: any = null;
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.userService.getBdms().subscribe((data) => {
  		this.bdms = data;
  		if(this.showAllOption) this.bdms.unshift({ name: "All", email: 'All' });
  		if(this.selectedBDM){
  			this.selectedBDM = this.bdms.filter(b => b.email === this.selectedBDM.email)[0];
  		}
  		
  	});
  }

  bdmSelected() {
  	if(this.selectedBDM){
  		this.changed.emit(this.selectedBDM);
  	}
  }
}
