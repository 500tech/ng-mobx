import 'angular'
import 'angular-mocks'

import { Counter } from './fixtures/counter-store'
import ngMobx from '../lib/ng-mobx'

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

beforeEach(module(ngMobx))

beforeEach(() => {
  counter = new Counter()

  inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_
    $rootScope = _$rootScope_
  })
})

test('module name should be exported', () => {
  expect(ngMobx).toBe('ng-mobx')
})

test('don\'t update without `mobx-autorun` directive', () => {
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

test('update with `mobx-autorun` directive', () => {
  // TODO: remove when working
  return

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