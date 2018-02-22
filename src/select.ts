import { Observable } from 'rxjs/Rx'
import { Subscription } from 'rxjs/Subscription'

import { Selectors } from './interfaces'

import { map, distinctUntilChanged } from 'rxjs/operators'

export const createSelectors = (store$): Selectors => {

  const select = <T, R>(selector: ((state: T) => R)): Observable<T> => store$
    .pipe(
      map(selector),
      distinctUntilChanged(),
    )

  const select$ = (...Operators): Subscription => store$
    .pipe(
        ...Operators,
        distinctUntilChanged()
      )
    .subscribe()

  return { select$, select }

}


