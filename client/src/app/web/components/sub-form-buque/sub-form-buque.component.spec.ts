import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFormBuqueComponent } from './sub-form-buque.component';

describe('SubFormBuqueComponent', () => {
  let component: SubFormBuqueComponent;
  let fixture: ComponentFixture<SubFormBuqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFormBuqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFormBuqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
