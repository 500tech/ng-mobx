import { reaction } from 'mobx'
import * as angular from 'angular'

const module = angular.module('ng-mobx', [])

const link: angular.IDirectiveLinkFn = ($scope) => {
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