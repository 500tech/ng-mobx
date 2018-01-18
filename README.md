
# mobx-angularjs

## MobX connector for AngularJS  (version 1.x)
If you're looking for the Angular 2+ version, it's [here](https://github.com/mobxjs/mobx-angular)

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

## Usage

Install:
```
$ npm install --save mobx-angularjs
```

<br>

Import `mobx-angularjs` and include the module:
```js
import mobxAngularJS from 'mobx-angularjs';

angular.module('app', [ mobxAngularjs ]);
```

<br>

Then use `mobx-autorun`:
```js
import { store } from './store/counter';

angular.component('myComponent', {
  controller: () => this.store = store,
  controllerAs: '$ctrl',
  template: `
    <div mobx-autorun>
      {{ $ctrl.store.value }} - {{ $ctrl.store.computedValue }}
      <button ng-click="$ctrl.store.action()">Action</button>
    </div>
  `
});
```

## Example

Clone this repository:

```bash
git clone https://github.com/nickbreaton/mobx-angularjs
cd mobx-angularjs
```

Install dependencies:

```bash
npm install
```

Start example server:

```bash
npm run example
```

__Note:__ Example uses [parcel](https://parceljs.org/) which requires Node 8+