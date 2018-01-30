import { scan } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { connector } from './connect'
import { Rextore, Reducer, Action } from './interfaces'

export * from './combineReducers'

export const createStore = <T>(initialState: T, reducer: Reducer<T>): Rextore => {

  const dispatcher$ = new Subject()
  const store$ = new BehaviorSubject(initialState)
  const connect = connector(store$)

   dispatcher$
    .pipe(
      scan((state: T, action: any, index: number) => reducer(state, action), initialState)
    )
   .subscribe(store$)

  const dispatch = (action: Action ): void => (
    dispatcher$.next(action)
  )

  return { connect, dispatch }
}
