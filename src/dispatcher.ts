import { scan, map, tap, concatMap  } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'

import { Rextore, Reducer, Action } from './interfaces'

export const createDispatcher = <T>(store$, reducers, middleware) => {

  const dispatcher$ = new Subject<T>()

  const midd = (action) => action.pipe(tap((x) => console.log(111111, x)))
  dispatcher$
    .pipe(/*
      map((action) => {
        return middleware(store$, action, dispatcher$)
      }),*/
      //concatMap(action => middleware(store$, action, dispatcher$)),
      tap(x => console.log(`[DISPATCHER]`, x)),
      scan((state: T, action: Action, index: number) => reducers(state, action), store$.value)
    )
  .subscribe(store$)

  return dispatcher$
}
