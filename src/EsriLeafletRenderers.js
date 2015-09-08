export var VERSION = '2.0.0-beta.1';

export { Renderer, renderer } from './Renderers/Renderer.js';
export { SimpleRenderer, simpleRenderer } from './Renderers/SimpleRenderer.js';
export { ClassBreaksRenderer, classBreaksRenderer } from './Renderers/ClassBreaksRenderer.js';
export { UniqueValueRenderer, uniqueValueRenderer } from './Renderers/UniqueValueRenderer.js';

export { Symbol } from './Symbols/Symbol.js';
export { PointSymbol, pointSymbol } from './Symbols/PointSymbol.js';
export { LineSymbol, lineSymbol } from './Symbols/LineSymbol.js';
export { PolygonSymbol, polygonSymbol } from './Symbols/PolygonSymbol.js';

import './FeatureLayerHook.js';
