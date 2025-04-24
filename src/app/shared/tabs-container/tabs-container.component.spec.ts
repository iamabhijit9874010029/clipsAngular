import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsContainerComponent } from './tabs-container.component';
import { Component } from '@angular/core';

@Component({
  template:`
    <app-tabs-container>
      <app-tab tabTitle="1"></app-tab>
      <app-tab tabTitle="2"></app-tab>
    </app-tabs-container>
  `
})
class TabHostComponent {}

describe('TabsContainerComponent', () => {
  let component: TabsContainerComponent;
  let fixture: ComponentFixture<TabsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabsContainerComponent]
    });
    fixture = TestBed.createComponent(TabsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
