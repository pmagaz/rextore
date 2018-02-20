import { createStore } from './store'
import { createConnect } from './connect'
import { actionTypes } from './actionTypes'
import { createDispatcher } from './dispatcher'
import { Rextore, Action } from './interfaces'

import { Observable } from 'rxjs/Observable'

export const createRextore = <T>(initialState: T, rootReducer: Function, middleware?: any): Rextore => {

  if (typeof initialState !== 'object') throw new Error('Initial State should be an Object')
  else if (typeof rootReducer !== 'function') throw new Error('You should use combineReducers function')

  const store$ = createStore(initialState)
  const connect = createConnect(store$)
  const dispatcher$ = createDispatcher(store$, rootReducer, middleware)

  const getState = () => store$.value
  const dispatch = (action: Action) => dispatcher$.next(Observable.of(action))
  
  dispatch(actionTypes.INIT)

  return { connect, dispatch, getState }

}
