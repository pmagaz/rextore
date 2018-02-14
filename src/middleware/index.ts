import { Rextore, Reducer, Action, Middleware } from '../interfaces'

export const createMiddleware = <T>(middlewares: Array<Function>) => (
  (store$, action, dispatch) => {
    middlewares.forEach(middleware => (
      dispatch = middleware(store$, action, dispatch)
    )
  )
  return Object.assign({}, store$.value, { dispatch })
  }
)

