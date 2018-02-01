# create-reduxreducer

![Build-Status](https://travis-ci.org/pmagaz/rextore.svg?branch=master)
[![Build status](https://ci.appveyor.com/api/projects/status/p10g61lj7agw6agt?svg=true)](https://ci.appveyor.com/project/pmagaz/create-reduxreducer)
[![Coverage Status](https://coveralls.io/repos/github/pmagaz/rextore/badge.svg?branch=master)](https://coveralls.io/github/pmagaz/rextore?branch=master)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

`rextore` is a Redux implementation using RxJs Observables. 

## Table of contents

1. [Installation](#installation)
2. [Usage](#usage)

## Installation

You can install it via npm. If you'll use it in a Isomorphic/Universal App i recommend you installing it as production dependency.

```
$ npm install rextore --save
```

## Usage

It only takes two arguments: an object with the action types as a key and the reduce function that will handle the actionType and an initial state.

In this example we define an actionHandlers object and it's reduce functions:

#### myReducer.js

```javascript
import createReduxReducer from 'create-reduxreducer';
import ActionTypes from '../actionTypes';

const actionHandlers = {
  [ActionTypes.INPUT_NUMBER]: inputNumber,
  [ActionTypes.INPUT_DECIMAL]: inputDecimal,
  ...
};

function inputNumber(state, action) {
  ...
}

function inputDecimal(state, action) {
  ...
}

const myReducer = createReducer(actionHandlers, {});

export { myReducer };

```

Then you can use this reducer as a regular redux reducer and pass it to combineReducers when you configure your store.

If you want to use arrow functions remember to define your actionHandlers object **after** your arrow functions: 

```javascript
import createReduxReducer from 'create-reduxreducer';
import ActionTypes from '../actionTypes';

const imputNumber = (state, action) => state;
const imputDecimal = (state, action) => state;

const actionHandlers = {
  [ActionTypes.INPUT_NUMBER]: inputNumber,
  [ActionTypes.INPUT_DECIMAL]: inputDecimal,
  ...
};

const myReducer = createReducer(actionHandlers, {});

```

You can pass as initial state whatever you want, regular objets or even ImmutableJs objects:

```javascript
import { Record } from 'immutable';

const DataModel = Record({
  id:0,
  age: 50,
  ...
});

export default createReducer(actionHandlers, new DataModel());
```

## Projects using create-reduxreducer

- [react-base](https://github.com/atSistemas/react-base/ (atSistemas React/Redux Isomorphic Platform)


## License

MIT