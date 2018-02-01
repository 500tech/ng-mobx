import { Count } from './fixtures/count-store'
import * as angular from 'angular'
import * as mobxAngular from '../lib/mobx-angularjs'

import 'angular-mocks'

let count: Count
let compile: angular.ICompileService
let scope: angular.IScope

beforeEach(() => {
  angular.mock.module(mobxAngular)

  angular.mock.inject(($compile, $rootScope) => {
    compile = $compile
    scope = $rootScope.$new()
  })

  jest.useFakeTimers()

  scope['count'] = count = new Count()
})

test('correct module name should be exported', () => {
  expect(mobxAngular).toBe('mobx-angularjs')
})

test('template should react to `mobx-autorun` directive', () => {
  const element = angular.element(`
    <div mobx-autorun>{{ count.word }}</div>
  `)

  compile(element)(scope)
  scope.$digest()

  expect(element.text()).toBe(count.word)

  count.increment()

  jest.runAllTimers()
  expect(element.text()).toBe(count.word)
})

test('template should not react without `mobx-autorun` directive', () => {
  const element = angular.element(`
    <div>{{ count.word }}</div>
  `)

  compile(element)(scope)
  scope.$digest()

  expect(element.text()).toBe(count.word)

  count.increment()
  
  jest.runAllTimers()
  expect(element.text()).not.toBe(count.word)
})