import { Reducer } from './interfaces'
import { Observable } from 'rxjs/Rx'

  export const mergeReducers = (...handlers) => (store$, action) => (
    Observable.merge(
      ...handlers.map(handler => handler(store$, action)
    ))
  )
