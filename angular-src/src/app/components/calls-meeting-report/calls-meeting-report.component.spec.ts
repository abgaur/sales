import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsMeetingReportComponent } from './calls-meeting-report.component';

describe('CallsMeetingReportComponent', () => {
  let component: CallsMeetingReportComponent;
  let fixture: ComponentFixture<CallsMeetingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsMeetingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsMeetingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
