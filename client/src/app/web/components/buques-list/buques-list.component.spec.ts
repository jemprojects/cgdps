import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { BuquesListComponent } from './buques-list.component'

describe('BuquesListComponent', () => {
  let component: BuquesListComponent
  let fixture: ComponentFixture<BuquesListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuquesListComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BuquesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
