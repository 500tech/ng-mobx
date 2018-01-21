import { angular } from './utils/angular'
import { IDirectiveLinkFn, IScope } from 'angular'
import { reaction } from 'mobx'
import { getWatcherMetadata } from './utils/watcher-list'

const module = angular.module('ng-mobx', [])

const link: IDirectiveLinkFn = (scope, element) => {
  console.log(
    // uniqBy(getWatcherMetadata(element), 'watcher')
    getWatcherMetadata(element)
  )
      // const dispose = reaction(
      //   () => watcher.get(scope),
      //   () => setTimeout(scope.$digest.bind(scope))
      // )
  
      // scope.$on('$destroy', dispose)
}


module.directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: false,
  link
}))

export default module.name
