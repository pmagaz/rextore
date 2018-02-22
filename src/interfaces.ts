import { Observable } from 'rxjs/Observable'

export interface Rextore<T> {
  select$: Observable<T>,
  store$: Observable<T>,
  getState: () => Object
  dispatch: (action: Action ) => void
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
