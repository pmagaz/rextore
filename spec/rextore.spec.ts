import { expect, should } from 'chai'
import { createRextore, createRootReducer } from '../src/'

describe('Rextore', () => {
  
  it('Should create a rextore with initial state', () => {
    
    const mockReducer = (state, action) => {
      switch (action.type) {
        default: 
        return state
      }
    }

    const rootReducer = createRootReducer({
      mockReducer 
    })

    const initialState = { count: 33}; 
    const rextore = createRextore(initialState, rootReducer)
    const rextoreValue = rextore.getState();
    expect(rextoreValue).to.deep.equal(initialState)
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

    const rootReducer = createRootReducer({
      mockReducer 
    })

    const initialState = { count: 10}; 
    const rextore = createRextore(initialState, rootReducer)
    rextore.dispatch({ type: 'INCREMENT' })
    rextore.dispatch({ type: 'INCREMENT' })
    const rextoreValue = rextore.getState();
    expect(rextoreValue).to.deep.equal({ count: 12 })
  })

  it('should throw Error with incorrect initialState', (done) => {
    const mockReducer = (state, action) => {
      switch (action.type) {
        default: 
        return state
      }
    }

    const rootReducer = createRootReducer({
    })
    
    expect(() => createRextore('', rootReducer)).to.throw(Error);
    done();

  });


  it('Should throw Error without rootReducer', (done) => {
    const mockReducer = (state, action) => {
      switch (action.type) {
        default: 
        return state
      }
    }

    const rootReducer = createRootReducer({
    })
    
    expect(() => createRextore({})).to.throw(Error);
    done();

  });


})