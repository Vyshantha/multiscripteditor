import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardLayoutsComponent } from './keyboard-layouts.component';

describe('KeyboardLayoutsComponent', () => {
  let component: KeyboardLayoutsComponent;
  let fixture: ComponentFixture<KeyboardLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardLayoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
