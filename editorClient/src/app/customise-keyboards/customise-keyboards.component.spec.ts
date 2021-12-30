import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiseKeyboardsComponent } from './customise-keyboards.component';

describe('CustomiseKeyboardsComponent', () => {
  let component: CustomiseKeyboardsComponent;
  let fixture: ComponentFixture<CustomiseKeyboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomiseKeyboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiseKeyboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
