import { Reducer } from './interfaces'
import { tap, scan, merge, map, mapTo, filter } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable'

export const createRootReducer = (reducers: any): Reducer<any> => (
  (state, action) => Object.keys(reducers)
    .reduce((nextState, key) => reducers[key](nextState, action), state)
  )

export const combineStoreHandlers = store$ => (...storeHandlers) => (...args) =>
  merge(
    ...storeHandlers.map(handler => {
      const output$ = handler(...args).subscribe(console.log)
      if (!output$) {
        throw new TypeError(`Error`)
      }
      return output$;
    })
  )
