import { Observable } from 'rxjs/Rx'
import { Subject } from 'rxjs/Subject'
import { mergeScan  } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Action } from './interfaces'

export const createDispatcher = <T>(store$: BehaviorSubject<T>, rootReducer: Function) => {

  const dispatcher$ = new Subject<T>()

  dispatcher$
    .pipe(
        mergeScan<any, T>((state: T, action$: Action): Observable<T> => (
        rootReducer(action$, state)), store$.value
      )
    )
  .subscribe(store$)

  return dispatcher$

}
