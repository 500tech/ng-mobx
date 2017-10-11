[![npm version](https://img.shields.io/npm/v/mobx-angularjs.svg?style=flat-square)](https://www.npmjs.com/package/mobx-angularjs)
# mobx-angularjs
forked from [ng1-mobx](https://github.com/NgMobx/ng1-mobx)

## MobX connector for Angular 1
If you're looking for the Angular 2 version version, it's [here](https://github.com/500tech/ng2-mobx)  

MobX is a modern reactive state management library.

This simple library connects MobX to Angular.

## Why use MobX
The advantages of MobX are:
* Normalized - MobX lets you define computed values that are based on the minimal state
* Reactivity - MobX Automatically figures out when to re-invoke subscribers according to which observables they use. This allows for extremely performant applications
* Plain objects - Use plain objects and classes with MobX decorators, or even observe existing objects (from external sources for example)
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
$ npm install --save ng-mobx
```

Import ng-mobx and include the module:
```
import ngMobx from 'ng-mobx';

angular.module('app', [
  ...
  ngMobx,
  ...
]);
```

Then use `mobx-autorun`:
```
import {store} from './store/counter';

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
See the `example` folder

To run it, clone this repo and run:
```
$ cd example
$ npm install
$ npm install -g kick
$ kick s
```
