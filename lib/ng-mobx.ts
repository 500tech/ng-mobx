import { angular } from './utils/vendor'
import { getWatcherMetadata, IWatcherMetadata } from './utils/watcher-list'
import { IDirectiveLinkFn, IScope } from 'angular'
import { observable, reaction } from 'mobx'

const module = angular.module('ng-mobx', [])

const link: IDirectiveLinkFn = (scope, element) => {
  // keep references to known watchers by `$$tag` assigned to watcher object
  const watchers: { [tag: string]: IWatcherMetadata } = {}
  
  const addToWatchers = (meta: IWatcherMetadata[]) => meta.forEach(datum => {
    // already have reference to watcher, break
    if (watchers[datum.watcher.$$tag]) return
    // save reference to new watcher
    watchers[datum.watcher.$$tag] = datum
    // update scope associated with watcher on change
    datum.dispose = reaction(
      () => datum.watcher.get(datum.scope),
      () => setTimeout(datum.scope.$digest.bind(datum.scope))
    )
    // dispose reaction and purge watcher from known references
    datum.scope.$on('$destroy', () => {
      if (datum.dispose) datum.dispose()
      delete watchers[datum.watcher.$$tag]
    })
  })

  // get watchers on directive link
  const initialWatchers = getWatcherMetadata(element)

  // add initial to known watchers
  addToWatchers(initialWatchers)

  // TODO: maybe add this to add to watchers function to keep track of entire stack?
  initialWatchers.forEach(meta => meta.scope.$watch(scope => {
    addToWatchers(getWatcherMetadata(element))
  }))

  // dispose of all known watchers on desctruction of directive
  scope.$on('$destroy', () => {
    for (let tag in watchers) {
      if (watchers[tag].dispose) watchers[tag].dispose()
      delete watchers[tag]
    }
  })
}

module.directive('mobxAutorun', () => ({
  restrict: 'A',
  scope: true,
  link
}))

export default module.name
