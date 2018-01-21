import * as flattenDeep from 'lodash.flattendeep'
export { flattenDeep }

import * as map from 'lodash.map'
export { map }

const cuid = require('cuid')
export { cuid }

import { IAngularStatic } from 'angular'
export const angular: IAngularStatic = (window as any).angular