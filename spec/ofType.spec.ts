import { expect, should } from 'chai'
import { createRextore, mergeReducers, ofType, applyMiddleware } from '../src/'
import { Observable } from 'rxjs/Rx'

describe('ofType', () => {

  it('should filter an action Type', (done) => {
    const actionMock = { type: 'INCREMENT'}

    Observable.of({ type: 'INCREMENT'})
    .ofType('INCREMENT')
    .subscribe(action => {
      expect(action).to.deep.equal(actionMock)
      done()
    })
  })


  it('should filter as pipeble operator too', (done) => {
    const actionMock = { type: 'INCREMENT'}

    Observable.of({ type: 'INCREMENT'})
    .pipe(
      ofType('INCREMENT')
    )
    .subscribe(action => {
      expect(action).to.deep.equal(actionMock)
      done()
    })
  })

})