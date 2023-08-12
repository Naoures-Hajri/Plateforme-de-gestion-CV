import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Langue1Component } from './langue1.component';

describe('Langue1Component', () => {
  let component: Langue1Component;
  let fixture: ComponentFixture<Langue1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Langue1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Langue1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
