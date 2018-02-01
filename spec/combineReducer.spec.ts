import { expect, should } from 'chai'
import { combineReducers } from '../src/'

describe('CombineReducers', () => {
  
  it('should handle state with two or more reducers', () => {

    const increaseReducer = (state, action) => {
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

    const decreaseReducer = (state, action) => {
      switch (action.type) {
        case 'DECREMENT':
          return {
            ...state,
            count: --state.count
          }
      default: 
        return state
      }
    }

    const rootReducer = combineReducers({
      increaseReducer, decreaseReducer
    })
    const newState = rootReducer({ count: 0 }, { type: 'INCREMENT' })
    expect(newState).to.deep.equal({ count: 1 })

    const newState2 = rootReducer({ count: 1 }, { type: 'DECREMENT' })
    expect(newState2).to.deep.equal({ count: 0 })
  })

})