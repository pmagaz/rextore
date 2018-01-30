import {createStore, combineReducers} from '../src/rextore';
import { Observable } from 'rxjs/Observable'
import { tap, scan, merge, map } from 'rxjs/operators'
import 'rxjs/add/observable/of';

export interface State {
  count: any
}

const initialState = {
  count: 0
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
      count: state.count-1
    };
    default:
      return state
  }
}
/*
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
*/
/*
const rootReducer = combineReducers({
  reducer, reducer2
})*/
/*
const reducer$ = Observable.create(observer => {
  observer.next(1)
}).pipe(
map(() => state => (
  state
  //console.log(44444, state.name)
)))*/
/*
const reducer$ = Observable.of('REDUCER')
.pipe(
  tap(x => console.log('REDUCER', x)),
  map(() => state => Object.assign({}, state, {count: state.count - 1}))
)
*/
const store = createStore<State>(initialState, reducer)

// const store = new Store<State>(reducer, initialState) store.connect(state =>
// state.name , next => console.log(1111, next))
/*
store.dispatch(Observable.of({ type: 'LECHES'})
.pipe(
  map(() => state => Object.assign({}, state, {count: state.count + 10}))
))

store.dispatch(Observable.of({ type: 'LECHES'})
.pipe(
  map(() => state => Object.assign({}, state, {count: state.count + 10}))
))*/

console.log(1111, store.getState())
store.dispatch({ type: 'INCREASE' })
store.dispatch({ type: 'INCREASE' })
store.dispatch({ type: 'INCREASE' })
store.dispatch({ type: 'INCREASE' })

console.log(2222, store.getState())
/*
store.connect(state => {
  console.log(11111, state)
  return state.name
}
  , next => console.log(2222, next))

store.dispatch({
  type: 'ADD',
  payload: {
    name: 'newName3'
  }
})*/
