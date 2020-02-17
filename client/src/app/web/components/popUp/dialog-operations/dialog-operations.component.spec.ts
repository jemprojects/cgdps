import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOperationsComponent } from './dialog-operations.component';

describe('DialogOperationsComponent', () => {
  let component: DialogOperationsComponent;
  let fixture: ComponentFixture<DialogOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
