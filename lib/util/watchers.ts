import { flattenDeep, map } from '../vendor/lodash'
import { IReactionDisposer } from 'mobx'
import { IScope } from 'angular'
import angular from '../vendor/angular'
import cuid from '../vendor/cuid'

// TYPES

export interface IWatcher {
  get: (scope: IScope) => any
  $$tag?: string // will be used to save reference to a map for quick lookup
}

export interface IWatcherGroup {
  scope: IScope
  element: JQLite
  watcher: IWatcher
  dispose?: IReactionDisposer
}

// PUBLIC FUNCTIONS

export function getWatcherGroups(element: JQLite): IWatcherGroup[] {
  // convert scopes to watcher metadata list
  const scopeList = [ element.data().$scope, element.data().$isolateScope ].map(
    scope => getWatchersFromScope(scope).map(createWatcherGroup(element, scope))
  )
  // recurse children to find more watchers
  const childList = map(
    element.children(),
    child => getWatcherGroups(angular.element(child))
  )
  // flatten all children
  return flattenDeep([ scopeList, childList ])
}

// PRIVATE FUNCTIONS

function getWatchersFromScope(scope: IScope): IWatcher[] {
  return (scope as any || {}).$$watchers || []
}

function createWatcherGroup(element: JQLite, scope: IScope) {
  return (watcher: IWatcher): IWatcherGroup => {
    if (!watcher.$$tag) watcher.$$tag = cuid()
    return { element, scope, watcher }
  }
}