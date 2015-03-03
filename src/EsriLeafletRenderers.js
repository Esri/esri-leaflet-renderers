var EsriLeafletRenderers = {
  VERSION: '0.0.1-beta.2'
};

// attach to the L.esri global if we can
if(typeof window !== 'undefined' && window.L && window.L.esri) {
  window.L.esri.Renderers = EsriLeafletRenderers;
}

// We do not have an 'Esri' variable e.g loading this file directly from source define 'Esri'
if(!Esri){
  var Esri = window.L.esri;
}
