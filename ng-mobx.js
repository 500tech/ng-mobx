define("utils/angular", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.angular = window.angular;
});
define("utils/cuid", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cuid = require('cuid');
});
define("utils/lodash", ["require", "exports", "lodash.flattendeep", "lodash.map", "lodash.uniqby"], function (require, exports, flattenDeep, map, uniqBy) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.flattenDeep = flattenDeep;
    exports.map = map;
    exports.uniqBy = uniqBy;
});
define("utils/watcher-list", ["require", "exports", "utils/angular", "utils/cuid", "utils/lodash"], function (require, exports, angular_1, cuid_1, lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getWatcherMetadata(element) {
        var scopeList = [element.data().$scope, element.data().$isolateScope].map(function (scope) { return getWatchersFromScope(scope).map(createWatcherMetadata(element, scope)); });
        var childList = lodash_1.map(element.children(), function (child) { return getWatcherMetadata(angular_1.angular.element(child)); });
        return lodash_1.flattenDeep([scopeList, childList]);
    }
    exports.getWatcherMetadata = getWatcherMetadata;
    function getWatchersFromScope(scope) {
        return (scope || {}).$$watchers || [];
    }
    function createWatcherMetadata(element, scope) {
        return function (watcher) {
            if (!watcher.$$tag)
                watcher.$$tag = cuid_1.cuid();
            return { element: element, scope: scope, watcher: watcher };
        };
    }
});
define("ng-mobx", ["require", "exports", "utils/angular", "utils/watcher-list"], function (require, exports, angular_2, watcher_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var module = angular_2.angular.module('ng-mobx', []);
    var link = function (scope, element) {
        console.log(watcher_list_1.getWatcherMetadata(element));
    };
    module.directive('mobxAutorun', function () { return ({
        restrict: 'A',
        scope: false,
        link: link
    }); });
    exports.default = module.name;
});
