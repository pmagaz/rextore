import { createRextore, mergeReducers, applyMiddleware } from '../src/';
import { Observable } from 'rxjs/Rx'
import { tap, scan, merge, map, mapTo, filter, mergeMap, switchMap, mergeAll, concatAll } from 'rxjs/operators'
import 'rxjs/add/observable/of';

import { ofType } from '../src/operators'
export interface State {
  count: any
}

const initialState = {
  count: 12
}

const reducer = (state, action) => {
  console.log('REDUCER', state, action)
  //console.log('[REDUCTING]', state, '@@@@', action)
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
    case 'REQUEST':
    return {
      ...state,
      count: 9999
    };
    default:
      return state
  }
}

const reducer2 = (state, action) => {
  //console.log('[REDUCTING 2]', state, '@@@@', action)
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


/*
const middlewareOne = (store, action, next) => {
  console.log(`[REXMD LOG] Dispatching ${ action.type }`)
  //next(action)
  //return next(action)
  return action
}*/

const middlewareOne = (action) => (
  action.pipe(
    tap((x) => console.log(`[REXMD LOG] Dispatching ${ action.type }`))
  )
)
/*
const requestMiddleware = (store, action, next) => {
  const { request, type, ...rest } = action;
  console.log(`[REXMD REQ] Dispatching ${ action.type }`)
  if(!request) return action
    console.log(555555)
    setTimeout(function() {
      next({ type: 'SUCCESS'})
     }, 100);

};*/


  const reduxcer = (store$, action$) => (
    action$.pipe(
      //ofType('INCREASE'),
      filter(x => x.type === 'INCREASE'),
      map(x => 'holaaaaaa'),
    )
      //tap(x => console.log(x)),
  )
  
  const reduxcer2 = (store$, action$) => (
    action$
      .filter(x => x.type === 'INCREASE')
      .map(x => 'adiossss')
      //tap(x => console.log(x)),
  )
const rootReducer = mergeReducers(reduxcer, reduxcer2)
//const rootReducer = createRootReducer({reducer, reducer2})
const middleware = applyMiddleware([middlewareOne]);
const rextore = createRextore<State>(initialState, rootReducer, middleware)

rextore.connect(state => state , next => {
  console.log(777777, next)
})

rextore.dispatch({ type: 'INCREASE' })
//rextore.dispatch({ type: 'INCREASE' })
//rextore.dispatch({ type: 'REQUEST' , request: () => true})
rextore.dispatch({ type: 'DECREASE' })
/*rextore.dispatch({ type: 'DECREASE' })
rextore.dispatch({ type: 'DECREASE' })*/