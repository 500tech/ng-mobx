import angular from 'angular';
import mobx from 'mobx';

export const wrappedFunctions = {};
['autorun', 'autorunAsync', 'reaction', 'when'].forEach((fnName) => {
  wrappedFunctions[fnName] =   (scope, ...args) => {
    const dispose = mobx[fnName](...args);
    if (scope) scope.$on('$destroy', dispose);
  }
});

const mobxAutorun = function mobxAutorun() {
  return {
    restrict: 'A',
    scope: false,
    link: function($scope) {
      const dispose = mobx.reaction(
        /**
         * copy $scope.$$watchers to avoid $$watchers disordering while array mapping which watcher.get($scope) may cause a $scope.$$watchers decrease
         * @example:
         *  <code>const unwatch = $scope.$watch('a', () => // do something; unwatch());</code>
         * @see https://github.com/angular/angular.js/blob/master/src/ng/rootScope.js#L428
        */
	    () => [...$scope.$$watchers].map((watcher) => watcher.get($scope)),
        () => setTimeout($scope.$digest.bind($scope), 0)
      );
      $scope.$on('$destroy', dispose);
    }
  };
};

export default angular.module('ng-mobx', [])
  .directive('mobxAutorun', mobxAutorun)
  .name;
