import { createRextore, mergeReducers, ofType, applyMiddleware } from '../src/';
import { Observable } from 'rxjs/Rx'
import { tap, scan, merge, map, mapTo, filter, mergeMap, switchMap, mergeAll, concatAll } from 'rxjs/operators'
import 'rxjs/add/observable/of';

export interface State {
  count: number
}

const initialState = {
  count: 0
}

const middlewareOne = (action) => (
  action.pipe(
    tap((x) => console.log(`[REXMD LOG] Dispatching ${ action.type }`))
  )
)

 const reduxcer = (action$, state) => action$
  .ofType('INCREASE')
  .map(({ payload }) => (
    { ...state, count: state.count + payload.num }
  ))


const reduxcer2 = (action$, state) => action$
  .pipe(
    ofType('DECREASE'),
    map(x => (
      { ...state, count: --state.count }
    ))
  )

const rootReducer = mergeReducers(reduxcer, reduxcer2)
const middleware = applyMiddleware([middlewareOne]);
const rextore = createRextore<State>(initialState, rootReducer, middleware)

rextore.connect(state => state, next => {
  console.log(777777, next)
})

rextore.dispatch({ type: 'IiNCREASE', payload: { num : 2 } })
rextore.dispatch({ type: 'INCREASE', payload: { num : 2 } })
rextore.dispatch({ type: 'INCREASE', payload: { num : 2 } })
//rextore.dispatch({ type: 'INCREASE' })
//rextore.dispatch({ type: 'REQUEST' , request: () => true})
rextore.dispatch({ type: 'DECREASE', payload: { num: 2 } })
rextore.dispatch({ type: 'INCREASE', payload: { num : 2 } })
rextore.dispatch({ type: 'INCREASE', payload: { num : 2 } })
rextore.dispatch({ type: 'INCREASE', payload: { num : 2 } })
/*rextore.dispatch({ type: 'DECREASE' })
rextore.dispatch({ type: 'DECREASE' })*/
