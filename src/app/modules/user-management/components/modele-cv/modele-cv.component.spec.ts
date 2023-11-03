import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleCvComponent } from './modele-cv.component';

describe('ModeleCvComponent', () => {
  let component: ModeleCvComponent;
  let fixture: ComponentFixture<ModeleCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
