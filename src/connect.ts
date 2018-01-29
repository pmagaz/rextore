import { Subscription } from 'rxjs/Subscription'
import { map, distinctUntilChanged } from 'rxjs/operators'

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
