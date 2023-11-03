import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competence1Component } from './competence1.component';

describe('Competence1Component', () => {
  let component: Competence1Component;
  let fixture: ComponentFixture<Competence1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Competence1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competence1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
