import { reaction } from 'mobx'

const { angular } = (window as any)

const moduleName = 'mobx-angularjs'

function link($scope) {
  const dispose = reaction(
    /**
     * copy $scope.$$watchers to avoid $$watchers disordering while array mapping which watcher.get($scope) may cause a $scope.$$watchers decrease
     * @see https://github.com/angular/angular.js/blob/master/src/ng/rootScope.js#L428
    */
    () => [...$scope.$$watchers].map(watcher => watcher.get($scope)),
    () => setTimeout($scope.$digest.bind($scope))
  )
  $scope.$on('$destroy', dispose)
}

(link as any).$inject = [
  '$scope'
]

angular.module(moduleName, []).directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))

// es2015 
export default moduleName

// commonjs
declare const module
module.exports = moduleName