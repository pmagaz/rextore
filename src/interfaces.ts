import { Observable } from 'rxjs/Observable'

export interface Rextore<T> {
  getState: () => T
  connect: Function
  dispatch: (action: Action ) => void
}

export interface Action {
  type: string
  payload?: object
}

export interface Reducer<T> {
  (state: T, action: Action): T
}
