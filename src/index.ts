import { reaction } from 'mobx'
import * as angular from 'angular'

const app = angular.module('mobx-angularjs', [])

const link: angular.IDirectiveLinkFn = ($scope) => {
  const { $$watchers = [] } = $scope as any

  const dispose = reaction(
    () => [...$$watchers].map(watcher => watcher.get($scope)),
    () => setTimeout($scope.$digest.bind($scope))
  )

  $scope.$on('$destroy', dispose)
}

app.directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))

export default app.name
