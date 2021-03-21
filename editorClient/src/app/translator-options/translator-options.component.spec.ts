import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorOptionsComponent } from './translator-options.component';

describe('TranslatorOptionsComponent', () => {
  let component: TranslatorOptionsComponent;
  let fixture: ComponentFixture<TranslatorOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslatorOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
