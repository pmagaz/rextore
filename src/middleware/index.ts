import { Observable } from 'rxjs/Observable'

import { Rextore, Reducer, Action, Middleware } from '../interfaces'


export const applyMiddleware = <T>(middlewares: Array<Function>) => (
  (store$, action, dispatcher) => {
    /*
    const next = (action) => dispatcher.next(action)
    middlewares.forEach(middleware => {
      middleware(store$, action, next)
    })
    return Object.assign({}, ...action)
  */
  //Observable.of(action)

  middlewares.forEach(middleware => {
    console.log(55555, middleware(action))
    return middleware(action)
    //middleware(store$, action, dispatcher)
  })
  }
)

