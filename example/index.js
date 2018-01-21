// attach `angular` to the window
import 'angular'

// import what you want from MobX
import { action, computed, observable } from 'mobx'
import { toWords } from 'number-to-words'
import ngMobx from '../lib/ng-mobx'

// define a MobX store
class CountStore {
  @observable value = 0

  @computed get word() {
    return toWords(this.value)
  }

  wordMultiple(x) {
    return toWords(this.value * x)
  }

  @action increment() {
    this.value++
  }

  @action decrement() {
    this.value--
  }
}

// create MobX shared store
const count = new CountStore()

// setup AngularJS app with `ng-mobx` module
const app = angular.module('App', [ ngMobx ])

// bind store to scope / controller
app.controller('AppController', function ($scope, $interval) {
  $scope.count = count
  $scope.val = true
  $interval(() => {
    $scope.val = !$scope.val
  }, 2000)
})

// update store outside of angular digest cycle
document.querySelector('#increment').onclick = () => count.increment()
document.querySelector('#decrement').onclick = () => count.decrement()