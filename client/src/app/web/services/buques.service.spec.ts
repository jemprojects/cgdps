import { TestBed } from '@angular/core/testing'

import { BuquesService } from './buques.service'

describe('BuquesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: BuquesService = TestBed.get(BuquesService)
    expect(service).toBeTruthy()
  })
})
