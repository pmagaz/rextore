import { Observable } from 'rxjs/Observable'

export interface Rextore {
  connect: Function
  dispatch: Function
  getState: Function
}

export interface Action {
  type: string
  payload?: object
}

export interface Reducer<T> {
  (state: T, action: Action): T
}
