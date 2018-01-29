export const combineReducers = reducers => {
  /*console.log(333333);
  return (state = {}, action) => {
    console.log(4444444, Object.keys(reducers));
    return Object.keys(reducers).reduce((nextState, key) => {
      console.log(555555, nextState, action);
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };*/
  reducers.map()
};
