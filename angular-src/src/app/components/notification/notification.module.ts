import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';

@NgModule({
	imports: [ CommonModule ],
	declarations: [
		NotificationComponent
	],
	exports: [
		NotificationComponent
	]
	
})
export class NotificationModule {

	constructor (@Optional() @SkipSelf() parentModule: NotificationModule) {
	    if (parentModule) {
	      throw new Error(
	        'CoreModule is already loaded. Import it in the AppModule only');
	    }
	  }

	  static forRoot(): ModuleWithProviders {
	    return {
	      ngModule: NotificationModule,
	      providers: [ NotificationService ]
	    };
	  }
}