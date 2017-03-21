/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClientdataComponent } from './clientdata.component';

describe('ClientdataComponent', () => {
  let component: ClientdataComponent;
  let fixture: ComponentFixture<ClientdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
