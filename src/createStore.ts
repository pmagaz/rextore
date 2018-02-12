
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { store } from './rextore'
import { connector } from './connect'
import { dispatcher } from './dispatcher'
import { Rextore, Reducer, Action } from './interfaces'

let storeCreated

export const createStore = <T>(initialState: T, rootReducer: Reducer<T>): Rextore => {

  if (storeCreated) throw new Error('You have called createStore twice!')
  else if (typeof initialState !== 'object') throw new Error('Initial State should be an Object')
  else if (typeof rootReducer !== 'function') throw new Error('You sould use combineReducers function to combine your reducers')

  const store$ = new BehaviorSubject(initialState)
  const connect = connector(store$)
  const dispatcher$ = dispatcher(store$, rootReducer, initialState)

  const dispatch = (action: Action ): void => (
    dispatcher$.next(action)
  )

  const getState = (): T => store$.value
  const data = { connect, dispatch, getState }
  store(data)
  return data
}
