import { Subject } from 'rxjs/Subject'
import { Observable, ObservableInput } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { filter, tap, scan, merge, map, mergeMap, mergeAll } from 'rxjs/operators'
import 'rxjs/add/observable/of';

import { Rextore, Reducer, Action } from './interfaces'
import { connector } from './connect'

export * from './combineReducers'

export const createStore = <T>(initialState: T, reducer: Reducer<T>): Rextore => {

  const dispatcher$ = new Subject()
  const store$ = new BehaviorSubject(initialState)
  const connect = connector(store$)

dispatcher$
    .pipe(
      scan((state: T, action: any, index: number) => {
        console.log('0000', state)
        const leches = reducer(state, action)
        console.log(3333, leches)
        return leches
      }
    ))
  .subscribe(x => store$.next(x))

  const dispatch = (action: Action ): void => (
    dispatcher$.next(action)
  )

  const getState = () => store$.value

  return { connect, dispatch, getState }
}
