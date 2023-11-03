import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditFormationComponent } from './dialog-edit-formation.component';

describe('DialogEditFormationComponent', () => {
  let component: DialogEditFormationComponent;
  let fixture: ComponentFixture<DialogEditFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
