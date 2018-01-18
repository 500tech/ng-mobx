import 'angular'
import 'angular-mocks'

import { action, computed, observable } from 'mobx'
import { toWords } from 'number-to-words'
import mobxAngularjs from '../lib/mobx-angularjs'

import { 
  IAngularStatic, 
  ICompileService,
  IRootScopeService 
} from 'angular'

const { angular }: { angular: IAngularStatic } = window as any
const { module, inject } = angular.mock

let $compile: ICompileService
let $rootScope: IRootScopeService & { [x: string]: any }
let counter: Counter

class Counter {
  @observable value = 0

  @action increment() {
    this.value++
  }

  @computed get word() {
    return toWords(this.value)
  }
}

beforeEach(module(mobxAngularjs))

beforeEach(() => {
  counter = new Counter()

  inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_
    $rootScope = _$rootScope_
  })
})

test('module name should be exported', () => {
  expect(mobxAngularjs).toBe('mobx-angularjs')
})

test('don\'t update without `mobx-autorun` direction', () => {
  const template = `
    <div>{{ counter.word }}</div>
  `
  const node = $compile(template)($rootScope)

  $rootScope.counter = counter
  $rootScope.$digest()

  expect(node.text()).toBe('zero')

  counter.increment()
  expect(node.text()).toBe('zero')

  counter.increment()
  expect(node.text()).toBe('zero')
})

test('update with `mobx-autorun` direction', () => {
  const template = `
    <div mobx-autorun>{{ counter.word }}</div>
  `
  const node = $compile(template)($rootScope)

  $rootScope.counter = counter
  $rootScope.$digest()

  expect(node.text()).toBe('zero')

  counter.increment()
  expect(node.text()).toBe('one')

  counter.increment()
  expect(node.text()).toBe('two')
})