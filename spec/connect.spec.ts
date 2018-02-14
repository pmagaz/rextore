import { expect, should } from 'chai'
import { createRextore, createRootReducer } from '../src/';

describe('createConnect', () => {

  it('Sould subscribe to the store and retrieve a state data', () => {
    const initialState = { count: 222 }
    const reducer = (state, action) => ( state )
    const rootReducer = createRootReducer({
      reducer
    })

    const store = createRextore(initialState , rootReducer) 

    store.connect(state => state , count => (
      expect(count).to.equal(initialState)
    ))

    store.connect(state => state.count , count => (
      expect(count).to.equal(222)
    ))
  })
})
