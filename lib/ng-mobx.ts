import { debounce } from './vendor/lodash'
import { getWatcherGroups, IWatcherGroup } from './util/watchers'
import { IDirectiveLinkFn, IScope } from 'angular'
import { observable, reaction, IMapChangeAdd } from 'mobx'
import angular from './vendor/angular'

const module = angular.module('ng-mobx', [])

const link: IDirectiveLinkFn = (scope, element) => {
  // keep references to known watchers by `$$tag` assigned to watcher object
  const watcherGroups: { [tag: string]: IWatcherGroup } = {}
  
  const addToWatchers = (groups: IWatcherGroup[]) => groups.forEach(watcherGroup => {
    // already have reference to watcher, break
    if (watcherGroups[watcherGroup.watcher.$$tag]) return
    // save reference to new watcher
    watcherGroups[watcherGroup.watcher.$$tag] = watcherGroup
    // update scope associated with watcher on change
    watcherGroup.dispose = reaction(
      () => watcherGroup.watcher.get(watcherGroup.scope),
      () => setTimeout(watcherGroup.scope.$digest.bind(watcherGroup.scope))
    )
    // dispose reaction and purge watcher from known references
    watcherGroup.scope.$on('$destroy', () => {
      watcherGroup.dispose()
      delete watcherGroups[watcherGroup.watcher.$$tag]
    })
  })

  // add potential untracked watchers when scope changes
  //   addresses: https://github.com/NgMobx/ng1-mobx/issues/3
  scope.$watch(debounce(
    () => addToWatchers(getWatcherGroups(element)), 
    (1000 / 60)
  ))

  // dispose of all known watchers on desctruction of directive
  scope.$on('$destroy', () => {
    for (let tag in watcherGroups) {
      if (watcherGroups[tag].dispose) watcherGroups[tag].dispose()
      delete watcherGroups[tag]
    }
  })
}

module.directive('mobxAutorun', () => ({
  restrict: 'AE',
  scope: true,
  link
}))

export default module.name
