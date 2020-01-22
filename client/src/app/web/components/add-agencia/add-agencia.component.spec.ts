import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgenciaComponent } from './add-agencia.component';

describe('AddAgenciaComponent', () => {
  let component: AddAgenciaComponent;
  let fixture: ComponentFixture<AddAgenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
