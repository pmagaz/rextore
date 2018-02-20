import { expect, should } from 'chai'
import { mergeReducers } from '../src/'
import { Observable } from 'rxjs/Rx'

describe('mergeReducers', () => {
  it('should merge reducers and return an observable', (done) => {

    const increaseReducer = (action$, state) => action$
      .ofType('INCREMENT')
      .map(({ payload }) => (
        { ...state, count: ++state.count }
      ))

    const decreaseReducer = (action$, state) => action$
      .ofType('INCREMENT')
      .map(({ payload }) => (
        { ...state, count: --state.count }
      ))

    const rootReducer = mergeReducers(
      increaseReducer, decreaseReducer
    )

    const increaseAction = Observable.of({ type: 'INCREMENT'})
    rootReducer(increaseAction, { count: 0 })
      .subscribe(x => {
        expect(x).to.deep.equal({ count: 1 })
        done()
      })
  })

})
