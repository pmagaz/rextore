import { createStore } from '../src/rextore';
import { reduce } from 'rxjs/operators/reduce';
export interface State {
  name: String,
}

const initialState = { name: 'Harry' };

const reducer = (state, action) => {
  console.log('[REDUCTING]', action);
  switch (action.type) {
      case 'ADD':
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };

const store = createStore<State>(initialState, reducer);

//const store = new Store<State>(reducer, initialState)

store.connect(state => state.name , next => console.log(1111, next))

store.dispatch({
  type: 'ADD',
  payload: { name: 'newName' }
})

store.dispatch({
  type: 'ADD',
  payload: { name: 'newName'}
})


