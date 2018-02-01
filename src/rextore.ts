import { scan } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { connector } from './connect'
import { Rextore, Reducer, Action } from './interfaces'

export const createStore = <T>(initialState: T, reducers: Reducer<T>): Rextore => {

  if (typeof initialState !== 'object') throw new Error('Initial State should be an Object')
  else if (typeof reducers !== 'function') throw new Error('You sould use combineReducers function')

  const dispatcher$ = new Subject()
  const store$ = new BehaviorSubject(initialState)
  const connect = connector(store$)

  dispatcher$
    .pipe(
      scan((state: T, action: any, index: number) => reducers(state, action), initialState)
    )
   .subscribe(store$)

  const dispatch = (action: Action ): void => dispatcher$.next(action)

  const getState = (): T => store$.value

  return { connect, dispatch, getState }
}
