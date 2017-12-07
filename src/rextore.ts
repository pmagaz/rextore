import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { tap, map, scan, distinctUntilChanged } from 'rxjs/operators'

import { Rextore, Reducer, Action } from './interfaces'

export const createStore = <T>(initialState: T, reducer: Reducer<T>): Rextore => {

  const store$ = new BehaviorSubject(initialState)

  const dispatch = (action: any): void => {
    console.log('[DISPATCHING]', action)
    store$.next(action)
  }
    const storeReducer = (): Observable<any> => (
    store$.pipe(
      scan((state: T, action: any, index: number) => reducer(state, action))
    )
  )

  const connect = <R>(selector: ((state: T) => R), fn: Function): Subscription => (
    storeReducer().pipe(
      map(selector),
      distinctUntilChanged(),
      tap(x => console.log('[SELECTOR]', x)),
    )
    .subscribe(next => fn(next))
  )

  //dispatch({ type: 'REXTORE INIT' })

  return { store$, connect, dispatch }

}