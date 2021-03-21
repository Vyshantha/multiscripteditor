import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceForKeyboardComponent } from './service-for-keyboard.component';

describe('ServiceForKeyboardComponent', () => {
  let component: ServiceForKeyboardComponent;
  let fixture: ComponentFixture<ServiceForKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceForKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceForKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
