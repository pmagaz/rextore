/*import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { connector } from './connect'
import { dispatcher } from './dispatcher'
import { Rextore, Reducer, Action } from './interfaces'

let store$$

export const createLeches = <T> (initialState, rootReducer): Rextore => {

  const store$ = new BehaviorSubject(initialState)
  const connect = connector(store$)
  const dispatcher$ = dispatcher(store$, rootReducer, initialState)
  const dispatch = (action: Action ): void => (
    dispatcher$.next(action)
  )

  const getState = (): T => store$.value

  store$$ = { ...store$, ...connect, ...dispatch, ...getState }

  return store$$
  //return { connect, dispatch, getState }
}

export const store = {}
*/

let leches 
export const store = (data) => {
  if (!leches) leches = data
  console.log(1111, leches)
  return leches
}
