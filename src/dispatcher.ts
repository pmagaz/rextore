import { filter, scan, mergeScan, map, tap, concatMap, mergeMap, concat, concatAll, mergeAll, switchMap } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Rx'
import { Rextore, Reducer, Action } from './interfaces'

export const createDispatcher = <T>(store$, reducers, middleware, rootReduxcer) => {

  const dispatcher$ = new Subject<T>()

  dispatcher$
    .pipe(
     tap(x => console.log(`[DISPATCHER]`, x.value)),
     mergeScan<any, T>((state: T, action$: Action): Observable<T> => (
      rootReduxcer(state, action$)), store$
     ),
     tap(x => console.log(`[DISPATCHER]`, x)),
    )
  .subscribe(store$)

  return dispatcher$
}
