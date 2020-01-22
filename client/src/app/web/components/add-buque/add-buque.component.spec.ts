import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuqueComponent } from './add-buque.component';

describe('AddBuqueComponent', () => {
  let component: AddBuqueComponent;
  let fixture: ComponentFixture<AddBuqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBuqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBuqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
