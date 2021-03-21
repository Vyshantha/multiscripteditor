import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootInfoBarComponent } from './foot-info-bar.component';

describe('FootInfoBarComponent', () => {
  let component: FootInfoBarComponent;
  let fixture: ComponentFixture<FootInfoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootInfoBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
