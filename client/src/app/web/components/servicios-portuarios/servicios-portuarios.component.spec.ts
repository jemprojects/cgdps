import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPortuariosComponent } from './servicios-portuarios.component';

describe('ServiciosPortuariosComponent', () => {
  let component: ServiciosPortuariosComponent;
  let fixture: ComponentFixture<ServiciosPortuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosPortuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosPortuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
