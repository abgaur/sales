import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsScheduledComponent } from './meetings-scheduled.component';

describe('MeetingsScheduledComponent', () => {
  let component: MeetingsScheduledComponent;
  let fixture: ComponentFixture<MeetingsScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsScheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
