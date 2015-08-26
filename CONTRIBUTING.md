Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

### Before filing an issue

Please take a look at [previous issues](https://github.com/Esri/esri-leaflet-renderers/issues) that resolve common problems.

If you're just looking for help, you'll probably attract the most eyes if you post in [GIS Stackexchange](http://gis.stackexchange.com/questions/ask?tags=esri-leaflet,leaflet) or the [Esri Leaflet place](https://geonet.esri.com/discussion/create.jspa?sr=pmenu&containerID=1841&containerType=700&tags=esri-leaflet,leaflet) on GeoNet.

If you think you're encountering a new bug, please feel free to log an [issue](https://github.com/Esri/esri-leaflet-renderers/issues/new) and include the steps to reproduce the problem (and preferably a running sample).

### I want to contribute, what should I work on?

There is a lot of room for contributions to Esri Leaflet and Esri Leaflet Renderers. Make sure you checkout the [development instructions](https://github.com/Esri/esri-leaflet-related#development-instructions) in the readme to help you get started.

##### More examples

The Esri Leaflet website is written using http://assemble.io/ and can be found at https://github.com/Esri/esri-leaflet/tree/master/site/source. You can use the existing examples as a reference.

### Setting up a dev environment

1. [Fork and clone Esri Leaflet Renderers](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-renderers` folder
5. Install the dependencies with `npm install`
5. run `grunt` from the command line. This will start the web server locally at [http://localhost:8001](http://localhost:8001) and start watching the source files and running linting and testing commands.
6. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

### Linting

Please make sure your changes pass JS Hint. This will help make sure code is consistent throughout Esri Leaflet. You can run JS Hint with `grunt jshint`.

### Testing

Please make sure your changes dont break existing tests. Testing is essential for determining backward compatibility and catching breaking changes. You can run tests with `grunt karma:run`, `grunt karma:watch` or `grunt karma:coverage.`