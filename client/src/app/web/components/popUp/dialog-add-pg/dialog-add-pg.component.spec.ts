import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPGComponent } from './dialog-add-pg.component';

describe('DialogAddPGComponent', () => {
  let component: DialogAddPGComponent;
  let fixture: ComponentFixture<DialogAddPGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddPGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
