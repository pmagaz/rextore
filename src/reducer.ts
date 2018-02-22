import { Observable } from 'rxjs/Rx'

export const mergeReducers = <T>(...reducers) => (action$: Observable<T>, state: T): Observable<T> => {
  if (!reducers) throw new Error('mergeReducers requires reduce functions as arguments')
  return Observable.merge(
    ...reducers.map(
      reducer => {
        if (typeof reducer !== 'function') throw new Error('Reducers should be pure functions')
        return reducer(action$, state)
      }
  ))
}
