import { expect, should } from 'chai'
import { createStore, combineReducers } from '../src/';

describe('Connector', () => {
  
  it('Sould subscribe to the store and retrieve a state data', () => {
    const initialState = { count: 222 }
    const reducer = (state, action) => ( state )
    const rootReducer = combineReducers({
      reducer
    })

    const store = createStore(initialState , rootReducer) 

    store.connect(state => state , count => (
      expect(count).to.equal(initialState)
    ))
    
    store.connect(state => state.count , count => (
      expect(count).to.equal(222)
    ))
  })
})