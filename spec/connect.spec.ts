import { expect, should } from 'chai'
import { createRextore, mergeReducers } from '../src/';

describe('createConnect', () => {

  it('Sould subscribe to the store and retrieve a state data', () => {
    const initialState = { count: 222 }
    const mockReducer = (action$, state) => action$
      .ofType('INCREMENT')
      .map(({ payload }) => (
        { ...state, count: ++state.count }
      ))

     const rootReducer = mergeReducers(mockReducer)

    const store = createRextore(initialState , rootReducer) 

    store.connect(state => state , count => (
      expect(count).to.equal(initialState)
    ))

    store.connect(state => state.count , count => (
      expect(count).to.equal(222)
    ))
  })
})
