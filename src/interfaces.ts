import { Observable } from 'rxjs/Observable'

export interface Rextore {
  store$: Observable<any>
  connect: Function
  dispatch: Function
}

export interface Action {
  type: string
  payload?: any
}

export interface Reducer<T> {
  (state: T, action: Action): T
}
