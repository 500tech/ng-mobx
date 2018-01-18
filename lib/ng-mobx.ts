import { IAngularStatic, IDirectiveLinkFn, IDirectiveFactory } from 'angular'
import { reaction } from 'mobx'

// import AngularJS from the window
const { angular }: { angular: IAngularStatic } = window as any

const module = angular.module('ng-mobx', [])

const link: IDirectiveLinkFn = scope => {
  // set empty array if no watchers are available
  const { $$watchers = [] } = scope as any

  // create MobX reaction to observables on scope
  const dispose = reaction(
    () => [...$$watchers].map(watcher => watcher.get(scope)),
    () => setTimeout(scope.$digest.bind(scope))
  )
  
  // tear down when scope is destroyed
  scope.$on('$destroy', dispose)
}

module.directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))

export default module.name