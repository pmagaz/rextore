import { createRextore, createRootReducer, applyMiddleware } from '../src/';
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
const rootReducer = createRootReducer({
  reducer, reducer2
})

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


const middleware = applyMiddleware([middlewareOne]);
const rextore = createRextore<State>(initialState, rootReducer, middleware)

rextore.connect(state => state.count , next => {
  //console.log(4444444, next)
})

rextore.dispatch({ type: 'INCREASE' })
rextore.dispatch({ type: 'REQUEST' , request: () => true})
rextore.dispatch({ type: 'DECREASE' })
/*rextore.dispatch({ type: 'DECREASE' })
rextore.dispatch({ type: 'DECREASE' })*/