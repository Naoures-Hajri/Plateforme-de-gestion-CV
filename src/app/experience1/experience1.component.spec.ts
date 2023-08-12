import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experience1Component } from './experience1.component';

describe('Experience1Component', () => {
  let component: Experience1Component;
  let fixture: ComponentFixture<Experience1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Experience1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Experience1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
