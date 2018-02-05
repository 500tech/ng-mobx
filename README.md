# mobx-angularjs

[![npm version](https://img.shields.io/npm/v/mobx-angularjs.svg?style=flat-square)](https://www.npmjs.com/package/mobx-angularjs)
[![coverage](https://img.shields.io/codecov/c/github/mobxjs/mobx-angularjs.svg?style=flat-square)](https://codecov.io/gh/mobxjs/mobx-angularjs)
[![npm downloads](https://img.shields.io/npm/dw/mobx-angularjs.svg?style=flat-square)](https://www.npmjs.com/package/mobx-angularjs)
[![Build Status](https://img.shields.io/travis/mobxjs/mobx-angularjs.svg?style=flat-square)](https://travis-ci.org/mobxjs/mobx-angularjs)

## AngularJS connector to MobX
This package is for Angular 1.x, if you're looking for the Angular 2+ version, it's [here](https://github.com/mobxjs/mobx-angular).

MobX is a modern reactive state management library.

This simple library connects MobX to Angular.

## Why use MobX
The advantages of MobX are:

* __Normalized__ - MobX lets you define computed values that are based on the minimal state

* __Reactivity__ - MobX Automatically figures out when to re-invoke subscribers according to which observables they use. This allows for extremely performant applications

* __Plain objects__ - Use plain objects and classes with MobX decorators, or even observe existing objects (from external sources for example)

* MobX is being used heavily in the community (mainly with React)

<a href="http://mobxjs.github.io/mobx" target="_blank">Read more about MobX</a>

## Why use this library
Performance and magic!

This library brings the magic of automatic data binding, together with incredibly high performance.

All you need is to wrap your template with a `mobx-autorun` directive.
The directive will automatically re-run the $digest cycle on the scope, whenever something that the template uses changes.

It will also dispose of the autorun callback when the scope is destroyed.

**Remind that you should always mark your isolated scope block with `mobx-autorun` directive(such as `ng-if`) thus mobx can reactive with.**

## Installation

Install, import, and include:
```
$ npm install --save mobx-angularjs
```

```js
import mobxAngular from 'mobx-angularjs'

angular.module('app', [ mobxAngular ])
```

### or

Use CDN and include:

```html
<!-- development -->
<script src="https://unpkg.com/mobx-angularjs/mobx-angularjs.js"></script>

<!-- production -->
<script src="https://unpkg.com/mobx-angularjs/mobx-angularjs.min.js"></script>
```

```js
angular.module('app', [ 'mobx-angularjs' ])
```

## Usage

```js
import { store } from './store'

angular.component('myComponent', {
  controller() {
    this.store = store
  },
  controllerAs: '$ctrl',
  template: `
    <div mobx-autorun>
      {{ $ctrl.store.value }} - {{ $ctrl.store.computedValue }}
      <button ng-click="$ctrl.store.action()">Action</button>
    </div>
  `
})
```

## Example

Clone this repository:

```
$ git clone https://github.com/mobxjs/mobx-angularjs
$ cd mobx-angularjs
```

Install dependencies:

```
$ npm install
```

Start example server:

```
$ npm run example
```

__Note:__ Example uses [Parcel](https://parceljs.org/) which requires Node 8+
