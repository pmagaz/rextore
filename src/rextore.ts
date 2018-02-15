import { actions$ } from './actions'
import { createStore } from './store'
import { createConnect } from './connect'
import { createDispatcher } from './dispatcher'
import { Rextore, Reducer, Action, Middleware } from './interfaces'

import { Observable } from 'rxjs/Observable'

export const createRextore = <T>(initialState: T, rootReducer: Reducer<T>, middleware?: any, rootReduxcer?: any): Rextore<T> => {

  if (typeof initialState !== 'object') throw new Error('Initial State should be an Object')
  else if (typeof rootReducer !== 'function') throw new Error('You sould use combineReducers function')

  const store$ = createStore(initialState)
  const connect = createConnect(store$)
  const dispatcher$ = createDispatcher(store$, rootReducer, middleware, rootReduxcer)

  const getState = () => store$.value
  const dispatch = (action: Action) => dispatcher$.next(Observable.of(action))
  //dispatch(actions.INIT)

  return { connect, dispatch, getState }

}
