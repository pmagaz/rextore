# rextore

![Build-Status](https://travis-ci.org/pmagaz/rextore.svg?branch=master)
[![Build status](https://ci.appveyor.com/api/projects/status/2tkhjyqj01h1pa8x?svg=true
)](https://ci.appveyor.com/project/pmagaz/rextore)
[![Coverage Status](https://coveralls.io/repos/github/pmagaz/rextore/badge.svg?branch=master)](https://coveralls.io/github/pmagaz/rextore?branch=master)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

`Rextore` is a Reactive State container based in RxJs and Redux.

## Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
2. [Typescript](#typescript)


## Installation


```
$ npm install rextore --save-dev
$ yarn install rextore --add
```

## Usage

### Creating the Store

First of all you need to create the store, define an initial state and add the rootReducer, a combination of all your reducers using combineReducers to the createStore method.

```javascript
import { createStore, combineReducers } from 'rextore'

const initialState = {
  count: 0
}

const rootReducer = combineReducers({
  reducer, reducer2...
})

const store = createStore(initialState, rootReducer)

```

### Dispatching an action

You can dispatch a traditional Redux Action using the dispatch method of your store instance in the same way of Redux dispatch its Actions:

```javascript
store.dispatch({
  type: 'NEW_NUMBER',
  payload: { number: 11 }
})

...

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW_NUMBER':
        return {
          ...state,
        count: action.payload.number
      }
    default:
      return state
  }
}

```

### Retrieving data from the Store

Rextore uses RxJs provides a few methods to subscribe to the store and/or retrieve data from it: 

#### Connect

Inspired by [react-redux](https://github.com/reactjs/react-redux) connect method, connect establish a RxJs subscription with the store. It require two arguments. A function who receives the state object and a RxJs next callback to the subscription.


```javascript
store.connect(state => state.count // specific node of the store
, next => { // next is the count value
  ...
})

```

#### getState

getState works in the same way of Redux getState. It retrieves whole state tree. This function is syncronous.


```javascript
const stateTree = store.getState()
```

## Typescript

Rextore is written in Typescript so you can use all the Typescript stuff for static type checking.

```javascript
export interface State {
  count: any
}

const initialState = {
  count: 0
}

const rootReducer = combineReducers({
  reducer, reducer2...
})

const store = createStore<State>(initialState, rootReducer)
``` 

## License

MIT