# rextore

![Build-Status](https://travis-ci.org/pmagaz/rextore.svg?branch=master)
[![Build status](https://ci.appveyor.com/api/projects/status/2tkhjyqj01h1pa8x?svg=true
)](https://ci.appveyor.com/project/pmagaz/rextore)
[![Coverage Status](https://coveralls.io/repos/github/pmagaz/rextore/badge.svg?branch=master)](https://coveralls.io/github/pmagaz/rextore?branch=master)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

`Rextore` is a Minimalistic Reactive State container based in RxJs and inspired by Redux & Redux-Observable. In Rextore everything is an Observable/Stream so your actions, reducers and middleware will be also Observables. 

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

First of all you need to create the store, define an initial state and add the rootReducer to it that is a merge of all your reducers using mergeReducers Rextore method.

```javascript
import { createRextore, mergeReducers } from 'rextore'

const initialState = {
  count: 0
}

const rootReducer = mergeReducers(
  reducer, reducer2...
)

const rextore = createRextore(initialState, rootReducer)

```

### Observable Actions

In Rextore, your actions are Observables but you can dispatch them in the same way of Redux dispatch its actions using plain objects with a type property to describe the type and a payload with the attached data to the action. This object will be the value emitted by the Observable Action.

```javascript
store.dispatch({
  type: 'INCREMENT',
  payload: { number: 10 }
})

```

### Reacting to actions

Similar to Redux, Rextore reducers are pure functions with two arguments: action$, the Observable action, and state, the current state tree of your app. In redux you usually use a switch-based reducer to filter your actions, and return the new state:

```javascript

function increaseReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + payload.num }
    default:
      return state
  }
}

```

 The same operation in Rextore is quite similar becase it uses pure fuctions as reducers too, with action and state parameters, but works in a different way. You don't need a switch-based method to filter your actions so you can specify one fuction per action actionType and filter them usiing the ofType custom operator to filter your action.type or use your own filter because your actions are Observables.

```javascript

const increaseReducer = (action$, state) => action$
  .ofType('INCREASE')
  .map(({ payload }) => (
    { ...state, count: state.count + payload.num }
  ))
```
Then you always should return a new state using the the operator pipeline. If you don't new to make any modification on the state tree, simple return state using map.

You can use the ofType operator as a letable/pipeable method importing the operator.

```javascript

import { ofType } from 'rextore'

const decreaseReducer = (action$, state) => action$
  .pipe(
    ofType('DECREASE'),
    map(({ payload }) => (
      { ...state, count: state.count - payload.num }
    ))
  )

```

### Retrieving data from the Store

Rextore store is also an Observable, so you can retrieve data from it in the reactive way. Rextore provides a few methods to subscribe to the store and/or retrieve data from it: 

#### Connect

Inspired by [react-redux](https://github.com/reactjs/react-redux) connect method, connect establish a RxJs subscription with the store. It require two arguments. A function who receives the state object and a RxJs next callback to the subscription.


```javascript
rextore.connect(state => state.count // specific node of the store
, next => { // next is the count value
  ...
})

```

#### getState

getState works in the same way of Redux getState. It returns the whole state tree. This function is syncronous.


```javascript
const stateTree = rextore.getState()
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

const rootReducer = createRootReducer({
  reducer, reducer2...
})

const rextore = createRextore<State>(initialState, rootReducer)
``` 

## License

MIT