import { createRextore, createRootReducer } from '../src/';
import { Observable } from 'rxjs/Observable'
import { tap, scan, merge, map } from 'rxjs/operators'
import 'rxjs/add/observable/of';

export interface State {
  count: any
}

const initialState = {
  count: 12
}

const reducer = (state, action) => {
  console.log('[REDUCTING]', state, '@@@@', action)
  switch (action.type) {
    case 'INCREASE':
        return {
          ...state,
          count: ++state.count
        };
    case 'DECREASE':
    return {
      ...state,
      count: state.count - 1
    };
    default:
      return state
  }
}

const reducer2 = (state, action) => {
  console.log('[REDUCTING 2]', state, '@@@@', action)
  switch (action.type) {
    case 'ADD2':
      console.log('ADDD2')
      const newName = action
        .payload
        .name
        .toUpperCase()
        return {
          ...state,
          name: newName
        };
    default:
      return state
  }
}
const rootReducer = createRootReducer({
  reducer, reducer2
})

const rextore = createRextore<State>(initialState, rootReducer)

rextore.connect(state => state.count , next => {
  console.log(1111, next)
})

rextore.dispatch({ type: 'INCREASE' })
rextore.dispatch({ type: 'DECREASE' })
rextore.dispatch({ type: 'DECREASE' })
rextore.dispatch({ type: 'DECREASE' })