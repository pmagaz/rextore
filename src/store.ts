import { BehaviorSubject } from 'rxjs/BehaviorSubject'

export const createStore = <T>(initialState): BehaviorSubject<T> => (
  new BehaviorSubject(initialState)
)
