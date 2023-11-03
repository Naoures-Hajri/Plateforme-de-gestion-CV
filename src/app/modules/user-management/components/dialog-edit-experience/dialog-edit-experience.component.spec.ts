import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditExperienceComponent } from './dialog-edit-experience.component';

describe('DialogEditExperienceComponent', () => {
  let component: DialogEditExperienceComponent;
  let fixture: ComponentFixture<DialogEditExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
