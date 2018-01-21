// add angular and angular mocks to window object
import 'angular'
import 'angular-mocks'

import { Count } from './fixtures/count-store'
import { IAngularStatic, ICompileService, IScope } from 'angular'
import ngMobx from '../lib/ng-mobx'

declare const angular: IAngularStatic

let scope: IScope, compile: ICompileService, count: Count;

jest.useFakeTimers()
jest.mock('lodash.debounce', () => fn => fn)

beforeEach(() => {
  angular.mock.module(ngMobx)

  angular.mock.inject(($compile, $rootScope) => {
    compile = $compile
    scope = $rootScope.$new()
  })

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

test('all child scopes of `mobx-autorun` directive should render', () => {
  const element = angular.element(`
    <div mobx-autorun>
      <p ng-if="condition">{{ count.word }}</p>
    </div>
  `)

  scope['condition'] = false
  
  compile(element)(scope)
  scope.$digest()
  
  expect(element.find('p').text()).toBe('')

  scope['condition'] = true
  scope.$digest()

  expect(element.find('p').text()).toBe(count.word)

  count.increment()
  jest.runAllTimers()  
  
  expect(element.find('p').text()).toBe(count.word)
})

test('[TODO] #4', () => {
  // https://github.com/NgMobx/ng1-mobx/issues/4
  // aka test with multiple MobX versions
})