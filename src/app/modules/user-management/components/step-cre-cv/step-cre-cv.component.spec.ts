import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCreCVComponent } from './step-cre-cv.component';

describe('StepCreCVComponent', () => {
  let component: StepCreCVComponent;
  let fixture: ComponentFixture<StepCreCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepCreCVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepCreCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
