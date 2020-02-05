import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuqueComponent } from './edit-buque.component';

describe('EditBuqueComponent', () => {
  let component: EditBuqueComponent;
  let fixture: ComponentFixture<EditBuqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBuqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBuqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
