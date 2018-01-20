import 'angular'
import 'angular-mocks'

import { Count } from './fixtures/count-store'
import ngMobx from '../lib/ng-mobx'

import { 
  IAngularStatic, 
  ICompileService,
  IScope
} from 'angular'

const { angular }: { angular: IAngularStatic } = window as any
const { module, inject } = angular.mock
import { observable, reaction } from 'mobx'

beforeEach(module(ngMobx))

test('template should react to `mobx-autorun` directive', 
  inject(($rootScope, $compile) => {
    jest.useFakeTimers()
    
    const element = angular.element(`
      <div mobx-autorun>{{ hello.word }}</div>
    `)
    const scope = $rootScope.$new()

    scope.hello = new Count()
    
    // scope.hello.set('bob')

    $compile(element)(scope)
    scope.$digest()

    expect(element.text()).toBe('zero')

    scope.hello.increment()

    jest.runAllTimers()
    expect(element.text()).toBe('one')
  })
)

// test('module name should be exported', () => {
//   expect(ngMobx).toBe('ng-mobx')
// })

// test('template should react to `mobx-autorun` directive', () => {
//   const template = `
//     <div>{{ count.word }}</div>
//   `
//   const node = $compile(template)($rootScope)

//   $rootScope.count = count
//   $rootScope.$digest()

//   expect(node.text()).toBe('zero')

//   count.increment()
//   expect(node.text()).toBe('zero')

//   count.increment()
//   expect(node.text()).toBe('zero')
// })

// test('[TODO] update with `mobx-autorun` directive', () => {
//   // const template = `
//   //   <div mobx-autorun>{{ count.word }}</div>
//   // `
//   // const node = $compile(template)($rootScope)

//   // $rootScope.count = count
//   // $rootScope.$digest()

//   // expect(node.text()).toBe('zero')

//   // count.increment()
//   // expect(node.text()).toBe('one')

//   // count.increment()
//   // expect(node.text()).toBe('two')
// })

// test('[TODO] account for watchers disoriding while mapping reaction', () => {
//   /**
//    * Copy $scope.$$watchers to avoid $$watchers disordering while array mapping which 
//    * watcher.get($scope) may cause a $scope.$$watchers decrease.
//    * 
//    * @see https://github.com/angular/angular.js/blob/master/src/ng/rootScope.js#L428
//   */
// })

// test('[TODO] #3', () => {
//   // https://github.com/NgMobx/ng1-mobx/issues/3
// })

// test('[TODO] #4', () => {
//   // https://github.com/NgMobx/ng1-mobx/issues/4
//   // aka test with multiple MobX versions
// })