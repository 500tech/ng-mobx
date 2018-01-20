import { IAngularStatic, IDirectiveLinkFn } from 'angular'
import { reaction } from 'mobx'

const angular: IAngularStatic = (window as any).angular

const module = angular.module('ng-mobx', [])

const link: IDirectiveLinkFn = ($scope) => {
  const { $$watchers = [] } = $scope as any

  const dispose = reaction(
    () => [...$$watchers].map(watcher => watcher.get($scope)),
    () => setTimeout($scope.$digest.bind($scope))
  )
  
  $scope.$on('$destroy', dispose)
}

module.directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))

export default module.name