import { Observable } from 'rxjs/Observable'

export interface Rextore {
  connect: Function
  dispatch: Function
  combineReducers: Function
}

export interface Action {
  type: string
  payload?: object
}

export interface Reducer<T> {
  (state: T, action: Action): T
}
