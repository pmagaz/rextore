import { createRextore, mergeReducers, ofType } from '../src/';
import { Observable } from 'rxjs/Rx'
import { tap, scan, merge, map, mapTo, filter, mergeMap, switchMap, mergeAll, concatAll } from 'rxjs/operators'
import 'rxjs/add/observable/of';

export interface State {
  count: number
  data: object
}

const initialState = {
  count: 0,
  data: {
    prop1: true,
    prop2: false
  }
}

 const increaseReducer = (action$, state) => action$
  .ofType('INCREASE')
  .map(({ payload }) => (
    { ...state, count: state.count + payload.num }
  ))


const decreaseReducer = (action$, state) => action$
  .pipe(
    ofType('DECREASE'),
    map(x => (
      { ...state, count: --state.count }
    ))
  )

const rootReducer = mergeReducers(increaseReducer, decreaseReducer)
const rextore = createRextore<State>(initialState, rootReducer)

//rextore.dispatch({ type: 'INCREASE', payload: { num : 2 } })

rextore.select$(
  map(state => state.count),
  tap(x => console.log(x))
);

//rextore.dispatch({ type: 'DECREASE', payload: { num : 2 } })
//rextore.dispatch({ type: 'DECREASE', payload: { num : 2 } })
