# rextore

![Build-Status](https://travis-ci.org/pmagaz/rextore.svg?branch=master)
[![Build status](https://ci.appveyor.com/api/projects/status/2tkhjyqj01h1pa8x?svg=true
)](https://ci.appveyor.com/project/pmagaz/rextore)
[![Coverage Status](https://coveralls.io/repos/github/pmagaz/rextore/badge.svg?branch=master)](https://coveralls.io/github/pmagaz/rextore?branch=master)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

`Rextore` is a Minimalistic Reactive State container based in RxJs and inspired by Redux & Redux-Observable. In Rextore everything is an Observable/Stream so your actions, reducers and middleware are also Observables. 

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating the Store](#creating-the-store)
  - [Observable Actions](#observable-actions)
  - [Reacting to Actions](#reacting-to-actions)
  - [Subscribing to Store](#subscribing-to-store)
- [Typescript](#typescript)


## Installation


```
$ npm install rextore --save-dev
$ yarn install rextore --add
```

## Usage

### Creating the Store

First of all you need to create the store, define an initial state and add the rootReducer to it that is a combination of all your reducers using mergeReducers method. 

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

In Rextore, your actions are also Observables but you can dispatch them in the same way of Redux dispatch its actions using plain objects with a type property to describe the type and a payload with the attached data to the action. This object will be the value emitted by the Observable Action.

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

 The same operation in Rextore is quite similar becase it uses pure fuctions as reducers too, with action and state parameters, but works in a different way. You don't need a switch-based method to filter your actions, in Rextore you can specify one fuction per action actionType and filter them using the ofType custom operator to filter your action.type or use your own filter because your actions are just Observables.

```javascript
const increaseReducer = (action$, state) => action$
  .ofType('INCREASE')
  .map(({ payload }) => (
    { ...state, count: state.count + payload.num }
  ))
```
Then you always should return a new state using the the operator pipeline. If you don't new to make any modification on the state tree, simple return state using map. You can use the ofType operator as a letable/pipeable method importing the operator.

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

### Subscribing to Store

Rextore store is an Observable so you can get slices or nodes of your state tree as Observables. Rextore provides two select methods to get these slices and listen for it changes.

#### select$

The select$ method allows you to subscribe to the store using operators in the same way you work with RxJs operators. The method excepts to receive a chain of RxJs operators: 

```javascript
const initialState = { count: 0 }

...

rextore.select$(
  map(state => state.count), // accesing count node
  filter(count => count === 0)// filtering...
  map(count => count * 2)
  // more operators here....
)
```

Select$ returns a subscription to the store, so when you use selec$ method you are stabilising a subscription to the store and its state tree:

```javascript
const decreaseReducer = (action$, state) =>   action$
  .pipe(
    ofType('INCREASE'),
    map(({ payload }) => (
      { ...state, count: state.count + payload.num }
    ))
  )

rextore.dispatch({ type: 'INCREASE', payload: { num : 2 })

// In other part of your app
rextore.select$(
  map(state => state.count), // count = 2
)
```

#### select

Select works a little bit diferent to select$ because it excepts to receive a selector function as a selector on the Store Observable and returns an Observable:

```javascript
const data$ = rextore.select(state => state.count)
data$.subscribe(count => ...)
```


#### getState

getState works in the same way of Redux getState. It returns the whole state tree in a syncronous way.


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

const rootReducer = mergeReducers({
  reducer, reducer2...
})

const rextore = createRextore<State>(initialState, rootReducer)
``` 

## License

MIT