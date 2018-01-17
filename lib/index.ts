import { reaction } from 'mobx'

const { angular } = (window as any)

function link($scope) {
  $scope.$on('$destroy', reaction(
    () => [...$scope.$$watchers].map(watcher => watcher.get($scope)),
    () => setTimeout($scope.$digest.bind($scope))
  ))
}

(link as any).$inject = [
  '$scope'
]

angular.module('mobx', []).directive('autorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))