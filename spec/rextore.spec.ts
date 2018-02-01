import { expect, should } from 'chai'
import { createStore, combineReducers } from '../src/'

describe('Rextore', () => {
  
  it('Should create a store with initial state', () => {
    
    const mockReducer = (state, action) => {
      switch (action.type) {
        default: 
        return state
      }
    }

    const rootReducer = combineReducers({
      mockReducer 
    })

    const initialState = { count: 33}; 
    const store = createStore(initialState, rootReducer)
    const storeValue = store.getState();
    expect(storeValue).to.deep.equal(initialState)
  })

  it('Should dispatch an action and reduce the state', () => {
    
    const mockReducer = (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return {
            ...state,
            count: ++state.count
          }
      default: 
      return state
    }
    }

    const rootReducer = combineReducers({
      mockReducer 
    })

    const initialState = { count: 10}; 
    const store = createStore(initialState, rootReducer)
    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'INCREMENT' })
    const storeValue = store.getState();
    expect(storeValue).to.deep.equal({ count: 12 })
  })

  it('should throw Error with incorrect initialState', (done) => {
    const mockReducer = (state, action) => {
      switch (action.type) {
        default: 
        return state
      }
    }

    const rootReducer = combineReducers({
    })
    
    expect(() => createStore('', rootReducer)).to.throw(Error);
    done();

  });


  it('Should throw Error without rootReducer', (done) => {
    const mockReducer = (state, action) => {
      switch (action.type) {
        default: 
        return state
      }
    }

    const rootReducer = combineReducers({
    })
    
    expect(() => createStore({})).to.throw(Error);
    done();

  });


})