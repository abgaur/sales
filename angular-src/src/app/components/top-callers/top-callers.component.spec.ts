import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCallersComponent } from './top-callers.component';

describe('TopCallersComponent', () => {
  let component: TopCallersComponent;
  let fixture: ComponentFixture<TopCallersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCallersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCallersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
