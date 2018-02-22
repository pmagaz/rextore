import { Observable } from 'rxjs/Observable'

import { createStore } from './store'
import { createSelectors } from './select'
import { actionTypes } from './actionTypes'
import { Rextore, Action } from './interfaces'
import { createDispatcher } from './dispatcher'

export const createRextore = <T>(initialState: T, rootReducer: Function, middleware?: any): Rextore => {

  if (typeof initialState !== 'object') throw new Error('Initial State should be an Object')
  else if (typeof rootReducer !== 'function') throw new Error('You should use combineReducers function')

  const store$ = createStore(initialState)
  const selects = createSelectors(store$)
  const dispatcher$ = createDispatcher(store$, rootReducer, middleware)

  const getState = () => store$.value
  const dispatch = (action: Action) => dispatcher$.next(Observable.of(action))
  
  dispatch(actionTypes.INIT)

  return { dispatch, getState, ...selects }

}
