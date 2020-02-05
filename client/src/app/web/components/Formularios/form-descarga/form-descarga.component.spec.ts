import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDescargaComponent } from './form-descarga.component';

describe('FormDescargaComponent', () => {
  let component: FormDescargaComponent;
  let fixture: ComponentFixture<FormDescargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDescargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
