import { angular } from './angular'
import { cuid } from './cuid'
import { IScope, IAngularStatic } from 'angular'
import { flattenDeep, map } from './lodash'

// TYPES

export interface IWatcher {
  get: (scope: IScope) => any
  $$tag?: string // will be used to save reference to a map for quick lookup
}

export interface IWatcherMetadata {
  scope: IScope
  element: JQLite
  watcher: IWatcher
}

// PUBLIC FUNCTIONS

export function getWatcherMetadata(element: JQLite): IWatcherMetadata[] {
  // convert scopes to watcher metadata list
  const scopeList = [ element.data().$scope, element.data().$isolateScope ].map(
    scope => getWatchersFromScope(scope).map(createWatcherMetadata(element, scope))
  )
  // recurse children to find more watchers
  const childList = map(
    element.children(),
    child => getWatcherMetadata(angular.element(child))
  )
  // flatten all children
  return flattenDeep([ scopeList, childList ])
}

// PRIVATE FUNCTIONS

function getWatchersFromScope(scope: IScope): IWatcher[] {
  return (scope as any || {}).$$watchers || []
}

function createWatcherMetadata(element: JQLite, scope: IScope) {
  return (watcher: IWatcher): IWatcherMetadata => {
    if (!watcher.$$tag) watcher.$$tag = cuid()
    return { element, scope, watcher }
  }
}