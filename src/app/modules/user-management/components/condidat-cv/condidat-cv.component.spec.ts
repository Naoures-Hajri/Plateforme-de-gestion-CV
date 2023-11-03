import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidatCvComponent } from './condidat-cv.component';

describe('CondidatCvComponent', () => {
  let component: CondidatCvComponent;
  let fixture: ComponentFixture<CondidatCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondidatCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondidatCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
