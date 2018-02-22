import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'


export interface Selectors {
  select$: (...Operators: any[]) => Subscription,
  select: <T, R>(selector: (state: T) => R) => Observable<T>,
}

export interface Rextore {
  getState: () => Object
  dispatch: (action: Action ) => void
  select$: (...Operators: any[]) => Subscription
  select: <T, R>(selector: (state: T) => R) => Observable<T>
}

export interface Action {
  type: string
  payload?: object
  request?: Function
}

export interface Reducer<T> {
  (action$: Observable<Action>, state: T): Observable<T>
}

export interface Middleware<T> {
  (state: T, action: Action): T
}
