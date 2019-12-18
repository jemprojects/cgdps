import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { BuquesFormComponent } from './buques-form.component'

describe('BuquesFormComponent', () => {
  let component: BuquesFormComponent
  let fixture: ComponentFixture<BuquesFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuquesFormComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BuquesFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
