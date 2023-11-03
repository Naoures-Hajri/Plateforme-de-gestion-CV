import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCvDetailsComponent } from './my-cv-details.component';

describe('MyCvDetailsComponent', () => {
  let component: MyCvDetailsComponent;
  let fixture: ComponentFixture<MyCvDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCvDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
