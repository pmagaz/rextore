import { scan } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'
import { disconnect } from 'cluster';
let dispatcherInstance

export const dispatcher = <T>(store$, reducers, initialState) => {

  const dispatcher$ = new Subject()

  dispatcher$
    .pipe(
      scan((state: T, action: any, index: number) => reducers(state, action), initialState)
    )
  .subscribe(store$)

  return dispatcher$
}
