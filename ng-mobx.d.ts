declare module "utils/angular" {
    import { IAngularStatic } from "utils/angular";
    export const angular: IAngularStatic;
}
declare module "utils/cuid" {
    export const cuid: any;
}
declare module "utils/lodash" {
    import * as flattenDeep from 'lodash.flattendeep';
    export { flattenDeep };
    import * as map from 'lodash.map';
    export { map };
    import * as uniqBy from 'lodash.uniqby';
    export { uniqBy };
}
declare module "utils/watcher-list" {
    import { IScope } from "utils/angular";
    export interface IWatcher {
        get: (scope: IScope) => any;
        $$tag?: string;
    }
    export interface IWatcherMetadata {
        scope: IScope;
        element: JQLite;
        watcher: IWatcher;
    }
    export function getWatcherMetadata(element: JQLite): IWatcherMetadata[];
}
declare module "ng-mobx" {
    const _default: any;
    export default _default;
}
