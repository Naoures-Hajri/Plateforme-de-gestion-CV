import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUpComponent } from './file-up.component';

describe('FileUpComponent', () => {
  let component: FileUpComponent;
  let fixture: ComponentFixture<FileUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
