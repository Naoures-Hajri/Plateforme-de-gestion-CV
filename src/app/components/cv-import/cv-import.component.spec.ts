import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvImportComponent } from './cv-import.component';

describe('CvImportComponent', () => {
  let component: CvImportComponent;
  let fixture: ComponentFixture<CvImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
