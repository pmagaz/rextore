import { expect, should } from 'chai'
import { createRextore, mergeReducers, ofType } from '../src/'

const mockReducer = (action$, state) => action$
  .ofType('INCREMENT')
  .map(({ payload }) => (
    { ...state, count: ++state.count }
  ))

const rootReducer = mergeReducers(mockReducer)

describe('Rextore', () => {

  it('Should create a rextore with initial state', () => {
    const initialState = { count: 33 }
    const rextore = createRextore(initialState, rootReducer)
    const rextoreValue = rextore.getState();
    expect(rextoreValue).to.deep.equal(initialState)
  })

  it('Should dispatch an action and reduce the state', () => {

    const initialState = { count: 10 }
    const rextore = createRextore(initialState, rootReducer)
    rextore.dispatch({ type: 'INCREMENT' })
    rextore.dispatch({ type: 'INCREMENT' })
    const rextoreValue = rextore.getState();
    expect(rextoreValue).to.deep.equal({ count: 12 })

  })

  it('should throw Error with incorrect initialState', (done) => {
    const rootReducer = mergeReducers(mockReducer)
    expect(() => createRextore('', rootReducer)).to.throw(Error)
    done()
  })


  it('Should throw Error without rootReducer', (done) => {
    const rootReducer = mergeReducers({})
    expect(() => createRextore({})).to.throw(Error)
    done()

  })


})