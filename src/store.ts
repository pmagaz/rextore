import { BehaviorSubject } from 'rxjs/BehaviorSubject'

export const createStore = (initialState) => (
  new BehaviorSubject(initialState)
)
