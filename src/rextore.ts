import { createStore } from './store'
import { createConnect } from './connect'
import { createDispatcher } from './dispatcher'
import { Rextore, Reducer, Action } from './interfaces'

export const rextore = <T>(initialState: T, rootReducer: Reducer<T>): Rextore<T> => {

  if (typeof initialState !== 'object') throw new Error('Initial State should be an Object')
  else if (typeof rootReducer !== 'function') throw new Error('You sould use combineReducers function')

  const store$ = createStore(initialState)
  const connect = createConnect(store$)
  const dispatcher$ = createDispatcher(store$, rootReducer, initialState)

  const getState = () => store$.value
  const dispatch = (action: Action) => dispatcher$.next(action)

  return { connect, dispatch, getState }

}
