// add angular and angular mocks to window object
import 'angular'
import 'angular-mocks'

import { Count } from './fixtures/count-store'
import { IAngularStatic, ICompileService, IScope } from 'angular'
import ngMobx from '../lib/ng-mobx'

declare const angular: IAngularStatic

let scope: IScope, compile: ICompileService, count: Count;

beforeEach(() => {
  angular.mock.module(ngMobx)

  angular.mock.inject(($compile, $rootScope) => {
    compile = $compile
    scope = $rootScope.$new()
  })

  jest.useFakeTimers()

  scope['count'] = count = new Count()
})

test('correct module name should be exported', () => {
  expect(ngMobx).toBe('ng-mobx')
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

test('[TODO] #3', () => {
  // https://github.com/NgMobx/ng1-mobx/issues/3
})