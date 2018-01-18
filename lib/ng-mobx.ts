import { IAngularStatic, IScope } from 'angular'
import { reaction } from 'mobx'

// import AngularJS from the window
const { angular }: { angular: IAngularStatic } = window as any

// declare global AngularJS module name for module systems
const moduleName = 'ng-mobx'

function link($scope: IScope & { $$watchers: any[] }) {
  const dispose = reaction(
    () => {
      /**
       * Copy $scope.$$watchers to avoid $$watchers disordering while array mapping which 
       * watcher.get($scope) may cause a $scope.$$watchers decrease.
       * 
       * @see https://github.com/angular/angular.js/blob/master/src/ng/rootScope.js#L428
      */
      return [...$scope.$$watchers].map(watcher => watcher.get($scope))
    },
    () => setTimeout($scope.$digest.bind($scope))
  )
  $scope.$on('$destroy', dispose)
}

link.$inject = [
  '$scope'
]

// create AngularJS module and attach directive
angular.module(moduleName, []).directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))

export default moduleName