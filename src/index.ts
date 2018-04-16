import { reaction } from 'mobx'
import angular  from 'angular'

const app = angular.module('mobx-angularjs', [])

const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const link: angular.IDirectiveLinkFn = ($scope) => {

  const { $$watchers = [] } = $scope as any
  const debouncedDigest = debounce($scope.$digest.bind($scope), 0);

  const dispose = reaction(
    () => [...$$watchers].map(watcher => watcher.get($scope)),
    () => !$scope.$root.$$phase && debouncedDigest()
  )

  $scope.$on('$destroy', dispose)
}

app.directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))

export default app.name
