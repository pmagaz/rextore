import { createStore } from './store'
import { createConnect } from './connect'
import { actions } from './actions'
import { createDispatcher } from './dispatcher'
import { Rextore, Reducer, Action, Middleware } from './interfaces'

export const createRextore = <T>(initialState: T, rootReducer: Reducer<T>, middleware?: any): Rextore<T> => {

  if (typeof initialState !== 'object') throw new Error('Initial State should be an Object')
  else if (typeof rootReducer !== 'function') throw new Error('You sould use combineReducers function')

  const store$ = createStore(initialState)
  const connect = createConnect(store$)
  const dispatcher$ = createDispatcher(store$, rootReducer, middleware)

  const getState = () => store$.value
  const dispatch = (action: Action) => dispatcher$.next(action)
  //dispatch(actions.INIT)

  return { connect, dispatch, getState }

}
