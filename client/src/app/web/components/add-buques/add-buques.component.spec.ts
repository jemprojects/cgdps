import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuquesComponent } from './add-buques.component';

describe('AddBuquesComponent', () => {
  let component: AddBuquesComponent;
  let fixture: ComponentFixture<AddBuquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBuquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBuquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
