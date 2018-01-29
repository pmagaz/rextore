import { Subject } from 'rxjs/Subject'
import { Observable, ObservableInput } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { filter, tap, scan, merge, map, mergeMap, mergeAll } from 'rxjs/operators'
import 'rxjs/add/observable/of';

import { Rextore, Reducer, Action } from './interfaces'
import { connector } from './connect'

export * from './combineReducers'

export const createStore = <T>(initialState: T, reducer$: Observable<any>): Rextore => {

  const action$ = new Subject()
  const store$ = new BehaviorSubject(initialState)
  const connect = connector(store$)

/*
  const leches = Observable.of('a');
  const reducer = (state, action) => {
  return Observable.of('reducer')
  .pipe(
    /*map(() => x => {
      console.log(1111, x)
      return Object.assign({}, state, {count: state.count - 1})
     }),
     map(x => {
       console.log(55555, state.value)
       return x
     }),
    //map(() => state => Object.assign({}, state, {count: state.count - 1}))
  )
}

  action$
  .pipe(
    //merge(reducer),
    scan((state: T, action: any, index: number) => {
      //console.log(343333, state)
      return reducer(state, action)
      }, Observable.of(initialState)
    ),
  )
  .subscribe(next => next.subscribe(store$))

  const dispatch = (action: Action ): void => (
    action$.next(action)
  )

  const getState = () => store$.value

  return { connect, dispatch, getState }
} */