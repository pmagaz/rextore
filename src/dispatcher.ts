import { scan, map, tap } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'

import { Rextore, Reducer, Action } from './interfaces'

export const createDispatcher = <T>(store$, reducers, middleware) => {

  const dispatcher$ = new Subject<T>()

  dispatcher$
    .pipe(
      map((action) => middleware(store$, action, dispatcher$)),
      tap(x => console.log(66666, x)),
      scan((state: T, action: Action, index: number) => reducers(state, action), store$.value)
    )
  .subscribe(store$)

  return dispatcher$
}
