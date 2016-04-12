var Builder = require('systemjs-builder');
var jserBuilder = new Builder('js/', { defaultJSExtensions: true });

jserBuilder.bundle('jser/jser.js', 'build/jser.js');
jserBuilder.bundle('api/jscriptcoder-api.js', 'build/jscriptcoder-api.js');