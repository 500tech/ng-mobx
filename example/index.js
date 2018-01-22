// import what you want from MobX
import { action, computed, observable } from 'mobx'
import { toWords } from 'number-to-words'
import angular from 'angular'
import ngMobx from 'mobx-angularjs'

// define a MobX store
class CountStore {
  @observable value = 0

  @computed get word() {
    return toWords(this.value)
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

// setup AngularJS app with `mobx-angularjs` module
const app = angular.module('App', [ ngMobx ])

// bind store to scope / controller
app.controller('AppController', function ($scope) {
  $scope.count = count
})

// update store outside of angular digest cycle
document.querySelector('#increment').onclick = () => count.increment()
document.querySelector('#decrement').onclick = () => count.decrement()