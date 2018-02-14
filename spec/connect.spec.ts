import { expect, should } from 'chai'
import { rextore, createRootReducer } from '../src/';

describe('createConnect', () => {

  it('Sould subscribe to the store and retrieve a state data', () => {
    const initialState = { count: 222 }
    const reducer = (state, action) => ( state )
    const rootReducer = createRootReducer({
      reducer
    })

    const store = rextore(initialState , rootReducer) 

    store.connect(state => state , count => (
      expect(count).to.equal(initialState)
    ))

    store.connect(state => state.count , count => (
      expect(count).to.equal(222)
    ))
  })
})
