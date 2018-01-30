import { Subscription } from 'rxjs/Subscription'
import { distinctUntilChanged } from 'rxjs/operators'
import { filter, tap, scan, merge, map, pluck, mergeMap, mergeAll } from 'rxjs/operators'

export const connector = <T, R>(store$): Function => {
  return function <T, R>(selector: ((state: T) => R), callback: Function): Subscription {
    return store$
      .pipe(
          map(selector),
          distinctUntilChanged(),
        )
      .subscribe(next => callback(next))
  }
}
