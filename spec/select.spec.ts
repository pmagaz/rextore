import { expect, should } from 'chai'
import { createRextore, mergeReducers, ofType } from '../src/';
import { map, tap, filter } from 'rxjs/operators'

describe('createSelector', () => {

  const initialState = { count: 100 }
  
  const mockReducer = (action$, state) => action$
  .pipe(
    ofType('INCREMENT'),
    map(x => (
      { ...state, count: ++state.count }
    )),
  )
  const rootReducer = mergeReducers(mockReducer)
  const rextore = createRextore(initialState , rootReducer)

  it('select$ sould return a subscription and allow operators chaining', () => {
    rextore.select$(
      map(state => expect(state).to.equal(initialState))
    )

    rextore.select$(
      filter(state => state.count === 100),
      map(state => expect(state.count).to.equal(100))
    )
  })

  it('select return an Observable and', () => {
    const data$ = rextore.select(state => state)
    data$.subscribe(x => expect(x).to.equal(initialState)
    )
  })

})
