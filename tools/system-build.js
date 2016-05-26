var Builder = require('systemjs-builder');
var jserBuilder = new Builder({
    baseURL: 'src',
    transpiler: 'typescript',
    paths: {
        'codemirror': './node_modules/codemirror/lib/codemirror.js',
        'codemirror-lang-javascript': './node_modules/codemirror/mode/javascript/javascript.js',
        'codemirror-editor-vim': './node_modules/codemirror/keymap/vim.js',
        'typescript': './node_modules/typescript/lib/typescript.js'
    },
    packages: {
        './node_modules': {
            defaultExtension: 'js',
        },
        '.': {
            defaultExtension: 'ts'
        }
    }
});

jserBuilder.buildStatic('jser/jser.ts', 'build/jser.js');
//jserBuilder.bundle('api/jscriptcoder-api.ts', 'build/jscriptcoder-api.js');