// add angular and angular mocks to window object
import 'angular'
import 'angular-mocks'

// import testing dependencies
import { Count } from './fixtures/count-store'
import { IAngularStatic, ICompileService, IScope } from 'angular'
import ngMobx from '../lib/ng-mobx'

// import angular from window as type
const { angular }: { angular: IAngularStatic } = window as any

// define shared vars
let scope: IScope, compile: ICompileService, count: Count;

beforeEach(() => {
  // enable mocking for ng-mobx module
  angular.mock.module(ngMobx)

  // mock dependencies
  angular.mock.inject(($compile, $rootScope) => {
    compile = $compile
    scope = $rootScope.$new()
  })

  // setup fake timers in jest to run timers synchronously
  jest.useFakeTimers()

  // create observable store
  count = new Count()

  // attach store to scope
  scope['count'] = count
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

test('[TODO] #4', () => {
  // https://github.com/NgMobx/ng1-mobx/issues/4
  // aka test with multiple MobX versions
})