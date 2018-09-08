export { version as VERSION } from '../package.json';

export { Renderer } from './Renderers/Renderer';
export { SimpleRenderer, simpleRenderer } from './Renderers/SimpleRenderer';
export { ClassBreaksRenderer, classBreaksRenderer } from './Renderers/ClassBreaksRenderer';
export { UniqueValueRenderer, uniqueValueRenderer } from './Renderers/UniqueValueRenderer';

export { Symbol } from './Symbols/Symbol';
export { PointSymbol, pointSymbol } from './Symbols/PointSymbol';
export { LineSymbol, lineSymbol } from './Symbols/LineSymbol';
export { PolygonSymbol, polygonSymbol } from './Symbols/PolygonSymbol';

import './FeatureLayerHook';
