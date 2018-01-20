import 'angular'
import 'angular-mocks'

import { Count } from './fixtures/count-store'
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
let count: Count

beforeEach(module(ngMobx))

beforeEach(() => {
  count = new Count()

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
    <div>{{ count.word }}</div>
  `
  const node = $compile(template)($rootScope)

  $rootScope.count = count
  $rootScope.$digest()

  expect(node.text()).toBe('zero')

  count.increment()
  expect(node.text()).toBe('zero')

  count.increment()
  expect(node.text()).toBe('zero')
})

test('[TODO] update with `mobx-autorun` directive', () => {
  // const template = `
  //   <div mobx-autorun>{{ count.word }}</div>
  // `
  // const node = $compile(template)($rootScope)

  // $rootScope.count = count
  // $rootScope.$digest()

  // expect(node.text()).toBe('zero')

  // count.increment()
  // expect(node.text()).toBe('one')

  // count.increment()
  // expect(node.text()).toBe('two')
})

test('[TODO] account for watchers disoriding while mapping reaction', () => {
  /**
   * Copy $scope.$$watchers to avoid $$watchers disordering while array mapping which 
   * watcher.get($scope) may cause a $scope.$$watchers decrease.
   * 
   * @see https://github.com/angular/angular.js/blob/master/src/ng/rootScope.js#L428
  */
})

test('[TODO] #3', () => {
  // https://github.com/NgMobx/ng1-mobx/issues/3
})

test('[TODO] #4', () => {
  // https://github.com/NgMobx/ng1-mobx/issues/4
  // aka test with multiple MobX versions
})