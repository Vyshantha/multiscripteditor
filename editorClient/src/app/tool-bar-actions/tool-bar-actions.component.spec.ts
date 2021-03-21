import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarActionsComponent } from './tool-bar-actions.component';

describe('ToolBarActionsComponent', () => {
  let component: ToolBarActionsComponent;
  let fixture: ComponentFixture<ToolBarActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBarActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
